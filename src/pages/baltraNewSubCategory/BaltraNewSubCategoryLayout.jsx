import { useState } from "react";
import ProductGrid, { ViewToggle } from "./ProductGrid"; // adjust path to wherever you saved it

const ChevronLeft = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M15 6l-6 6 6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

/* ---------------- Sidebar ---------------- */

const Sidebar = ({ subCategories, activeId, onSelect, categoryName }) => (
  <>
    {/* Mobile: horizontal scrollable chips */}
    <div className="lg:hidden -mx-4 px-4 mb-5">
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            !activeId
              ? "bg-[#E91C1C] text-white border-[#E91C1C]"
              : "bg-white text-[#4A453D] border-[#EDE6D9]"
          }`}
        >
          All
        </button>
        {subCategories.map((sc) => (
          <button
            key={sc.id}
            onClick={() => onSelect(sc.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${
              String(activeId) === String(sc.id)
                ? "bg-[#E91C1C] text-white border-[#E91C1C]"
                : "bg-white text-[#4A453D] border-[#EDE6D9]"
            }`}
          >
            {sc.name}
          </button>
        ))}
      </div>
    </div>

    {/* Desktop: vertical list, sticky */}
    <aside className="hidden lg:block w-[260px] shrink-0">
      <div className="sticky top-6 bg-white rounded-xl shadow-sm border border-[#EDE6D9] overflow-hidden">
        <div className="bg-gradient-to-r from-[#E91C1C] to-[#831010] px-4 py-3.5">
          <h3 className="text-white font-semibold text-sm tracking-wide">
            {categoryName || "Categories"}
          </h3>
        </div>
        <ul>
          <li>
            <button
              onClick={() => onSelect(null)}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-sm text-left border-l-4 transition-colors ${
                !activeId
                  ? "border-[#E91C1C] bg-[#FDEEEE] text-[#E91C1C] font-medium"
                  : "border-transparent text-[#4A453D] hover:bg-[#FDFBF7]"
              }`}
            >
              All Categories
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          </li>
          {subCategories.map((sc) => (
            <li key={sc.id} className="border-t border-[#F1EBDD]">
              <button
                onClick={() => onSelect(sc.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-sm text-left border-l-4 transition-colors ${
                  String(activeId) === String(sc.id)
                    ? "border-[#E91C1C] bg-[#FDEEEE] text-[#E91C1C] font-medium"
                    : "border-transparent text-[#4A453D] hover:bg-[#FDFBF7]"
                }`}
              >
                <span className="truncate pr-2">{sc.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {sc.products?.length > 0 && (
                    <span className="text-[10px] bg-[#F1EBDD] text-[#8A8378] rounded-full px-1.5 py-0.5">
                      {sc.products.length}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  </>
);

/* ---------------- Subcategory tile grid (default / "All" view) ---------------- */

const SubCategoryTileGrid = ({ subCategories, onSelect }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
    {subCategories.map((sc) => (
      <button
        key={sc.id}
        onClick={() => onSelect(sc.id)}
        className="group bg-white rounded-xl border border-[#EDE6D9] hover:border-[#E91C1C]/30 hover:shadow-md transition-all p-4 sm:p-5 flex flex-col items-center text-center"
      >
        <div className="w-full h-40 sm:h-48 flex items-center justify-center mb-3 rounded-lg bg-gradient-to-br from-[#FAF7F2] to-[#F1EAD9] p-3">
          <img
            src={sc.image_url}
            alt={sc.name}
            loading="lazy"
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <span className="text-sm font-medium text-[#1C1917] group-hover:text-[#E91C1C] transition-colors line-clamp-2">
          {sc.name}
        </span>
        {sc.products?.length > 0 && (
          <span className="text-xs text-[#8A8378] mt-1">
            {sc.products.length} item{sc.products.length > 1 ? "s" : ""}
          </span>
        )}
      </button>
    ))}
  </div>
);

/* ---------------- Empty state for a subcategory with no products yet ---------------- */

const EmptySubCategory = ({ subCategory }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-xl border border-[#EDE6D9]">
    {subCategory?.image_url && (
      <img
        src={subCategory.image_url}
        alt={subCategory.name}
        className="w-20 h-20 object-contain opacity-60 mb-4"
      />
    )}
    <p className="text-[#6B645A] text-sm">
      No products available in{" "}
      <span className="font-medium text-[#1C1917]">{subCategory?.name}</span>{" "}
      yet.
    </p>
  </div>
);

/* ---------------- Loading skeleton ---------------- */

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl border border-[#EDE6D9] p-4 sm:p-5 animate-pulse"
      >
        <div className="w-full h-40 sm:h-48 bg-[#F4F0E7] rounded-lg mb-3" />
        <div className="h-3 bg-[#F4F0E7] rounded w-3/4 mx-auto" />
      </div>
    ))}
  </div>
);

/* ---------------- Main layout ---------------- */

const BaltraNewSubCategoryLayout = ({
  loading,
  subCategories = [],
  categoryInfo,
  activeId,
  onSelect,
  activeSubCategory,
}) => {
  const [view, setView] = useState("grid");

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 pb-10 bg-[#FDFBF7]">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar
          subCategories={subCategories}
          activeId={activeId}
          onSelect={onSelect}
          categoryName={categoryInfo?.category_name}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            {activeSubCategory ? (
              <button
                onClick={() => onSelect(null)}
                className="flex items-center gap-1 text-sm text-[#6B645A] hover:text-[#E91C1C]"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to all categories
              </button>
            ) : (
              <span />
            )}

            {activeSubCategory?.products?.length > 0 && (
              <ViewToggle view={view} onChange={setView} />
            )}
          </div>

          {loading ? (
            <SkeletonGrid />
          ) : subCategories.length === 0 ? (
            <div className="text-center text-[#6B645A] py-16">
              No categories found.
            </div>
          ) : activeSubCategory ? (
            activeSubCategory.products?.length > 0 ? (
              <ProductGrid
                products={activeSubCategory.products}
                subCategoryName={activeSubCategory.name}
                view={view}
              />
            ) : (
              <EmptySubCategory subCategory={activeSubCategory} />
            )
          ) : (
            <SubCategoryTileGrid
              subCategories={subCategories}
              onSelect={onSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BaltraNewSubCategoryLayout;
