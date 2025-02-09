import { FC } from 'react';
import { Character } from '../../interfaces/types';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  results: Character[];
  loading: boolean;
}

const SearchResults: FC<Props> = ({ results, loading }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemClick = (id: number) => {
    console.log(`Item clicked: ${id}`);
    searchParams.set('details', id.toString());
    setSearchParams(searchParams);
    console.log('Updated searchParams:', searchParams.toString());
    navigate(`details/${id}`);
  };

  if (loading) {
    return (
      <div className="loader" role="status">
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
        <div
          key={result.id}
          className="result-item"
          role="button"
          tabIndex={0}
          onClick={() => handleItemClick(result.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleItemClick(result.id);
            }
          }}
        >
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
};

export default SearchResults;
