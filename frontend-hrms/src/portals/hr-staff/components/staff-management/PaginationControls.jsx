import React, { useEffect, useState } from 'react';

const PaginationControls = ({ currentPage, totalPages, onPageChange, className = '' }) => {
  const wrapperClassName = className ? `pagination-bar ${className}` : 'pagination-bar';
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const commitPageInput = () => {
    const parsedPage = Number(pageInput);

    if (!Number.isFinite(parsedPage)) {
      setPageInput(String(currentPage));
      return;
    }

    const nextPage = Math.min(totalPages, Math.max(1, parsedPage));
    onPageChange(nextPage);
    setPageInput(String(nextPage));
  };

  return (
    <div className={wrapperClassName}>
      <button
        className="pagination-btn"
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <label className="pagination-text pagination-jump-label">
        <span>Page</span>
        <input
          className="pagination-input"
          type="number"
          min="1"
          max={totalPages}
          inputMode="numeric"
          value={pageInput}
          onChange={(event) => setPageInput(event.target.value)}
          onBlur={commitPageInput}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur();
            }
          }}
          aria-label="Enter page number"
        />
        <span>of {totalPages}</span>
      </label>
      <button
        className="pagination-btn"
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;