import React from "react";
import PropTypes from "prop-types";

const CustomerPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <>
      <div className="flex justify-center mt-4 font-gothamNarrow">
        <button
          onClick={() => onPageChange((currentPage || 1) - 1)}
          disabled={currentPage === 1 || currentPage === null}
          className="px-2 py-1 bg-gray-200 mr-2 rounded text-sm font-gothamNarrow"
        >
          Prev
        </button>
        {Array.from({ length: totalPages || 0 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-2 py-1 ${
              currentPage === index + 1
                ? "bg-[rgb(214,40,40)] text-white"
                : "bg-gray-200"
            } mr-2 rounded text-sm`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange((currentPage || 0) + 1)}
          disabled={currentPage === totalPages || currentPage === null}
          className="px-2 py-1 bg-gray-200 rounded text-sm font-gothamNarrow"
        >
          Next
        </button>
      </div>
    </>
  );
};

CustomerPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomerPagination;
