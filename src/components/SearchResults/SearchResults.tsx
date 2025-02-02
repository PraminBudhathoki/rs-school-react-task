import { Component } from 'react';
import { Character } from '../../interfaces/types';

interface Props {
  results: Character[];
  loading: boolean;
}

class SearchResults extends Component<Props> {
  render() {
    const { results, loading } = this.props;

    if (loading) {
      return (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="no-results">
          <p>Nothing found</p>
        </div>
      );
    }

    return (
      <div className="results">
        {results.map((result: Character) => (
          <div key={result.id} className="result-item">
            <img src={result.image} alt={result.name} />
            <div>
              <h3>Name: {result.name}</h3>
              <p>
                <strong>Species:</strong> {result.species}
              </p>
              <p>
                <strong>Gender:</strong> {result.gender}
              </p>
              <p>
                <strong>Status:</strong> {result.status}
              </p>
              <p>
                <strong>Origin:</strong> {result.origin.name}
              </p>
              <p>
                <strong>Last Known Location:</strong> {result.location.name}
              </p>
              <p>
                <strong>Appeared in Episodes:</strong> {result.episode.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
