import { FC } from 'react';
import SearchInput from '../SearchInput/SearchInput';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const TopField: FC<Props> = ({ searchTerm, onSearch }) => {
  return (
    <div className="top-field">
      <SearchInput searchTerm={searchTerm} onSearch={onSearch} />
    </div>
  );
};

export default TopField;
