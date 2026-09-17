import React from "react";
import { Link } from "react-router-dom";

const ChevronRight = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * items: [{ label: string, to?: string, onClick?: fn }]
 * Last item is always rendered as the current (non-clickable) crumb.
 */
const Breadcrumb = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 py-3 text-xs sm:text-sm text-gray-500 flex items-center flex-wrap gap-1"
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
            {isLast ? (
              <span className="text-gray-800 font-medium truncate max-w-[220px]">
                {item.label}
              </span>
            ) : item.to ? (
              <Link
                to={item.to}
                className="hover:text-[#E91C1C] transition-colors truncate max-w-[160px]"
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-[#E91C1C] transition-colors truncate max-w-[160px]"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
