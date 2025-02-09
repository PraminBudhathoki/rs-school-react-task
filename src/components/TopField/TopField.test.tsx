import { render, screen } from '@testing-library/react';
import TopField from './TopField';
import SearchInput from '../SearchInput/SearchInput';
import { vi } from 'vitest';

vi.mock('../SearchInput/SearchInput', () => ({
  default: vi.fn(() => <div data-testid="search-input-mock" />),
}));

describe('TopField Component', () => {
  it('renders SearchInput component', () => {
    render(<TopField searchTerm="test" onSearch={() => {}} />);

    expect(screen.getByTestId('search-input-mock')).toBeInTheDocument();
  });

  it('passes searchTerm and onSearch props correctly', () => {
    const mockOnSearch = vi.fn();

    render(<TopField searchTerm="test value" onSearch={mockOnSearch} />);

    expect(SearchInput).toHaveBeenCalledWith(
      { searchTerm: 'test value', onSearch: mockOnSearch },
      expect.anything()
    );
  });
});
