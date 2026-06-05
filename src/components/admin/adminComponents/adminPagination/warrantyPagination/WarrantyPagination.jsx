import PropTypes from "prop-types";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

/**
 * Build the page-number sequence to display, inserting `null` where an
 * ellipsis ("···") should appear.
 *
 * e.g. current=6, total=18  →  [1, null, 5, 6, 7, null, 18]
 */
function buildPageRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const showLeftEllipsis = current > 3;
  const showRightEllipsis = current < total - 2;

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return [
    1,
    ...(showLeftEllipsis ? [null] : []),
    ...middle,
    ...(showRightEllipsis ? [null] : []),
    total,
  ];
}

/* ─── sub-components ──────────────────────────────────────────────────────── */

const PageButton = ({ page, current, onClick }) => {
  const isActive = page === current;
  return (
    <button
      onClick={() => onClick(page)}
      aria-label={`Page ${page}`}
      aria-current={isActive ? "page" : undefined}
      className={`
        inline-flex items-center justify-center min-w-[36px] h-9 px-2.5
        rounded-lg border text-sm font-medium transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-1
        ${
          isActive
            ? "bg-rose-500 border-rose-500 text-white shadow-sm shadow-rose-200"
            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700"
        }
      `}
    >
      {page}
    </button>
  );
};

const Ellipsis = () => (
  <span className="inline-flex items-center justify-center min-w-[36px] h-9 text-sm text-slate-400 tracking-widest select-none">
    ···
  </span>
);

const NavButton = ({ onClick, disabled, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className="
      inline-flex items-center justify-center gap-1.5 h-9 px-3
      rounded-lg border border-slate-200 bg-white text-sm font-medium
      text-slate-500 transition-all duration-150
      hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700
      disabled:opacity-35 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-1
    "
  >
    {children}
  </button>
);

/* ─── main component ──────────────────────────────────────────────────────── */

const WarrantyPagination = ({ currentPage, totalPages, onPageChange }) => {
  const current = currentPage ?? 1;
  const total = totalPages ?? 0;

  if (total <= 1) return null;

  const pages = buildPageRange(current, total);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-1.5 flex-wrap"
    >
      {/* Prev */}
      <NavButton
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        ariaLabel="Previous page"
      >
        <HiChevronLeft size={15} />
        <span className="hidden sm:inline">Prev</span>
      </NavButton>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === null ? (
          <Ellipsis key={`ellipsis-${i}`} />
        ) : (
          <PageButton
            key={p}
            page={p}
            current={current}
            onClick={onPageChange}
          />
        ),
      )}

      {/* Next */}
      <NavButton
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        ariaLabel="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <HiChevronRight size={15} />
      </NavButton>
    </nav>
  );
};

WarrantyPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default WarrantyPagination;
