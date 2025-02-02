import { Component } from 'react';
import SearchInput from '../SearchInput/SearchInput';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

class TopField extends Component<Props> {
  render() {
    const { searchTerm, onSearch } = this.props;

    return (
      <div className="top-field">
        <SearchInput searchTerm={searchTerm} onSearch={onSearch} />
      </div>
    );
  }
}

export default TopField;
