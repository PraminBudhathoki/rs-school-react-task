import React, { Component } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

interface State {
  localSearchTerm: string;
}

class SearchInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      localSearchTerm: props.searchTerm,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ localSearchTerm: this.props.searchTerm });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ localSearchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.localSearchTerm.trim();
    if (trimmedSearchTerm !== this.props.searchTerm) {
      this.props.onSearch(trimmedSearchTerm);
      if (trimmedSearchTerm) {
        localStorage.setItem('searchTerm', trimmedSearchTerm);
        console.log(`Saved to local storage: ${trimmedSearchTerm}`);
      } else {
        localStorage.removeItem('searchTerm');
        console.log('Search term is empty, removed from local storage.');
      }
    }
  };

  render() {
    const isSearchDisabled =
      this.state.localSearchTerm.trim() === this.props.searchTerm.trim();
    const hintMessage = isSearchDisabled
      ? 'Update the search term for  new request to the api.'
      : '';

    return (
      <div className="search-section">
        Search Term:
        <input
          type="text"
          value={this.state.localSearchTerm}
          onChange={this.handleChange}
        />
        <button
          onClick={this.handleSearch}
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
  }
}

export default SearchInput;
