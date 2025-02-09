import { FC } from 'react';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasResults: boolean;
}
const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasResults,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={!hasResults || currentPage === 1}
      >
        Previous
      </button>
      {hasResults && (
        <span>
          Page {currentPage} of {totalPages}
        </span>
      )}
      <button
        onClick={handleNext}
        disabled={!hasResults || currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
