import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchInput from './SearchInput';
import useLocalStorageSearchTerm from '../../hooks/useLocalStorageSearchTerm';
import { vi } from 'vitest';

vi.mock('../../hooks/useLocalStorageSearchTerm', () => ({
  default: vi.fn(),
}));

describe('SearchInput Component', () => {
  let mockSetLocalSearchTerm: (newValue: string) => void;
  let mockHandleSearchTermSave: () => void;
  let localSearchTerm: string;

  beforeEach(() => {
    localSearchTerm = 'saved term';

    mockSetLocalSearchTerm = vi.fn((newValue) => {
      localSearchTerm = newValue;
    });

    mockHandleSearchTermSave = vi.fn();

    (useLocalStorageSearchTerm as vi.Mock).mockImplementation(() => [
      localSearchTerm,
      mockSetLocalSearchTerm,
      mockHandleSearchTermSave,
    ]);

    localStorage.clear();
  });

  it('retrieves value from local storage on mount', () => {
    render(<SearchInput searchTerm="saved term" onSearch={() => {}} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('saved term');
  });

  it('updates input value when typing', () => {
    render(<SearchInput searchTerm="old term" onSearch={() => {}} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new search' } });

    expect(mockSetLocalSearchTerm).toHaveBeenCalledWith('new search');
  });

  it('calls onSearch with trimmed value when search button is clicked', () => {
    const mockOnSearch = vi.fn();

    const { rerender } = render(
      <SearchInput searchTerm="old term" onSearch={mockOnSearch} />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    act(() => {
      fireEvent.change(input, { target: { value: 'new search' } });

      (useLocalStorageSearchTerm as vi.Mock).mockImplementation(() => [
        'new search',
        mockSetLocalSearchTerm,
        mockHandleSearchTermSave,
      ]);

      rerender(<SearchInput searchTerm="old term" onSearch={mockOnSearch} />);
    });

    fireEvent.click(button);

    expect(mockHandleSearchTermSave).toHaveBeenCalled();
    expect(mockOnSearch).toHaveBeenCalledWith('new search');
  });

  it('disables search button when input value matches searchTerm', () => {
    const { rerender } = render(
      <SearchInput searchTerm="same term" onSearch={() => {}} />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    act(() => {
      fireEvent.change(input, { target: { value: 'same term' } });

      (useLocalStorageSearchTerm as vi.Mock).mockImplementation(() => [
        'same term',
        vi.fn(),
        vi.fn(),
      ]);

      rerender(<SearchInput searchTerm="same term" onSearch={() => {}} />);
    });

    expect(button).toBeDisabled();
  });
});
