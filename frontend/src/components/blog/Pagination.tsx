import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEvenIfOnePage?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, showEvenIfOnePage }) => {
  if (totalPages <= 1 && !showEvenIfOnePage) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pagination-wrapper">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`pagination-arrow ${currentPage === 1 ? 'disabled' : 'active'}`}
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : 'active'}`}
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export const PaginationSeparator = () => (
  <div className="w-8 h-1 bg-zinc-300/60 rounded-full mb-6 mx-auto" />
);



export default Pagination;
