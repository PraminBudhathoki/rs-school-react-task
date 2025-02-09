import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
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
  const detailsId = searchParams.get('details');
  const detailsRef = useRef<HTMLDivElement>(null);

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

  const handleCloseDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (
      detailsRef.current &&
      !detailsRef.current.contains(event.target as Node)
    ) {
      handleCloseDetails();
    }
  };

  const isDetailsVisible = Boolean(detailsId);

  return (
    <ErrorBoundary>
      <div className={`app ${isDetailsVisible ? 'split-view' : 'full-width'}`}>
        <div className="main-content">
          <div className="search-section-main">
            <TopField searchTerm={searchTerm} onSearch={handleSearch} />
            {loading && <div className="loader">Loading...</div>}
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
        <div
          ref={detailsRef}
          className={`details-section ${isDetailsVisible ? '' : 'hidden'}`}
          onClick={handleClickOutside}
        >
          <Outlet context={{ handleCloseDetails }} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
