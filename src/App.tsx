import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResults from './components/SearchResults/SearchResults';
import { fetchCharacters } from './services/api';
import { Character } from './interfaces/types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TopField from './components/TopField/TopField';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Pagination from './components/Pagination/Pagination';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    () => localStorage.getItem('searchTerm') || ''
  );
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const fetchResults = useCallback(async (term: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { characters, totalPages } = await fetchCharacters(term, page);
      setResults(characters);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching results:', error);
        setLoading(false);
        setError(error.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchResults(searchTerm, page);
  }, [fetchResults, searchTerm, page]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchResults(term, 1);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
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
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasResults={results.length > 0}
          />
          <ErrorButton />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
