import { useEffect, useState } from 'react';
import SearchResults from './components/SearchResults/SearchResults';
import { fetchCharacters } from './services/api';
import { Character } from './interfaces/types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TopField from './components/TopField/TopField';
import ErrorButton from './components/ErrorButton/ErrorButton';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    () => localStorage.getItem('searchTerm') || ''
  );
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResults(searchTerm);
  }, [searchTerm]);

  const fetchResults = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCharacters(term);
      setResults(data);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching results:', error);
        setLoading(false);
        setError(error.message);
      }
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="search-section-main">
          <TopField searchTerm={searchTerm} onSearch={handleSearch} />
          {error && <div className="error">{error}</div>}
        </div>
        <div className="results-section">
          <SearchResults results={results} loading={loading} />
          <ErrorButton />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
