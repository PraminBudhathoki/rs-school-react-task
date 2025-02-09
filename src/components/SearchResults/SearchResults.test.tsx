import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchResults from './SearchResults';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Character } from '../../interfaces/types';

const mockNavigate = vi.fn();
const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
  };
});

describe('SearchResults Component', () => {
  const mockResults: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://example.com/rick.png',
      episode: ['S01E01', 'S01E02'],
      url: 'https://example.com/rick',
      created: '2017-11-04T18:48:46.250Z',
    },
  ];

  it('displays loader when loading is true', () => {
    render(
      <BrowserRouter>
        <SearchResults results={[]} loading={true} />
      </BrowserRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it("displays 'Nothing found' when there are no results", () => {
    render(
      <BrowserRouter>
        <SearchResults results={[]} loading={false} />
      </BrowserRouter>
    );

    expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
  });

  it('renders search results correctly', () => {
    render(
      <BrowserRouter>
        <SearchResults results={mockResults} loading={false} />
      </BrowserRouter>
    );

    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/human/i)).toBeInTheDocument();
    expect(screen.getByText(/alive/i)).toBeInTheDocument();
  });

  it('navigates when a result item is clicked', () => {
    render(
      <BrowserRouter>
        <SearchResults results={mockResults} loading={false} />
      </BrowserRouter>
    );

    const resultItem = screen.getByText(/rick sanchez/i).closest('div');
    act(() => {
      fireEvent.click(resultItem!);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams)
    );
    expect(mockNavigate).toHaveBeenCalledWith('details/1');
  });

  it('navigates when Enter key is pressed', () => {
    render(
      <BrowserRouter>
        <SearchResults results={mockResults} loading={false} />
      </BrowserRouter>
    );

    const resultItem = screen.getByText(/rick sanchez/i).closest('div');
    act(() => {
      fireEvent.keyDown(resultItem!, { key: 'Enter' });
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('details/1');
  });

  it('navigates when Space key is pressed', () => {
    render(
      <BrowserRouter>
        <SearchResults results={mockResults} loading={false} />
      </BrowserRouter>
    );

    const resultItem = screen.getByText(/rick sanchez/i).closest('div');
    act(() => {
      fireEvent.keyDown(resultItem!, { key: ' ' });
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('details/1');
  });
});
