import { ChangeEvent, FC } from 'react';
import useLocalStorageSearchTerm from '../../hooks/useLocalStorageSearchTerm';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchInput: FC<Props> = ({ searchTerm, onSearch }: Props) => {
  const [localSearchTerm, setLocalSearchTerm, handleSearchTermSave] =
    useLocalStorageSearchTerm('searchTerm', searchTerm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearch = (): void => {
    const trimmedSearchTerm = localSearchTerm.trim();
    if (trimmedSearchTerm !== searchTerm) {
      onSearch(trimmedSearchTerm);
      handleSearchTermSave();
    }
  };

  const isSearchDisabled = localSearchTerm.trim() === searchTerm.trim();
  const hintMessage = isSearchDisabled
    ? 'Update the search term to make a new request.'
    : '';

  return (
    <div className="search-section">
      <input type="text" value={localSearchTerm} onChange={handleChange} />
      <button
        onClick={handleSearch}
        disabled={isSearchDisabled}
        className={
          isSearchDisabled ? 'search-button disabled' : 'search-button'
        }
      >
        Search
      </button>
      {isSearchDisabled && <div className="hint">{hintMessage}</div>}
    </div>
  );
};

export default SearchInput;
