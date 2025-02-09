import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterDetail from './CharacterDetail';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { fetchCharacterDetails } from '../../services/api';

const mockNavigate = vi.fn();
const mockParams = { id: '1' };

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => mockParams,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../services/api', () => ({
  fetchCharacterDetails: vi.fn(),
}));

describe('CharacterDetail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading state initially', () => {
    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays error message if character details fail to load', async () => {
    (fetchCharacterDetails as vi.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load character details/i)
      ).toBeInTheDocument();
    });
  });

  it('fetches and displays character details', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://example.com/rick.png',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
    };

    (fetchCharacterDetails as vi.Mock).mockResolvedValue(mockCharacter);

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText(/Alive/i)).toBeInTheDocument();
      expect(screen.getByText(/Human/i)).toBeInTheDocument();
      expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Episode number
    });
  });

  it('navigates back when close button is clicked', async () => {
    (fetchCharacterDetails as vi.Mock).mockResolvedValue({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://example.com/rick.png',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
    });

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
