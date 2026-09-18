import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const GridIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const ListIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect
      x="3"
      y="4"
      width="18"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="3"
      y="10"
      width="18"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="3"
      y="16"
      width="18"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const formatPrice = (value) => {
  if (value === null || value === undefined) return "";
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
};

/* Detail row used inside the list card */
const DetailRow = ({ label, value }) => {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="text-sm">
      <span className="text-[#8A8378]">{label}: </span>
      <span className="font-semibold text-[#1C1917]">{value}</span>
    </div>
  );
};

/* View toggle */
export const ViewToggle = ({ view, onChange }) => (
  <div className="flex items-center gap-1 bg-[#F1EBDD] rounded-md p-1 self-end">
    <button
      onClick={() => onChange("grid")}
      aria-label="Grid view"
      className={`p-1.5 rounded ${
        view === "grid" ? "bg-white shadow-sm text-[#E91C1C]" : "text-[#A39C8F]"
      }`}
    >
      <GridIcon className="w-4 h-4" />
    </button>
    <button
      onClick={() => onChange("list")}
      aria-label="List view"
      className={`p-1.5 rounded ${
        view === "list" ? "bg-white shadow-sm text-[#E91C1C]" : "text-[#A39C8F]"
      }`}
    >
      <ListIcon className="w-4 h-4" />
    </button>
  </div>
);

/* Grid card — matches the RelatedProductCard used elsewhere on the site:
   flat white card, fixed-height image area, divider, stacked detail rows. */
const ProductGridCard = ({ p, subCategoryName }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        boxShadow:
          "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      className="h-full"
    >
      <Link
        to={`/baltra-product-view/${p.id}`}
        className="flex flex-col h-full w-full bg-white border border-[#E4E4E4] p-5"
      >
        <div className="flex justify-center items-center w-full h-48 shrink-0 mb-6">
          <img
            src={p.main_image_url}
            alt={p.model_name || p.name}
            loading="lazy"
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="border-t border-[#E4E4E4] mt-2 pt-2 flex-1 flex flex-col">
          <div className="text-[#4A4A4A] text-xs mt-4 font-gothamNarrow mb-2 space-y-2">
            <div className="line-clamp-1">
              <span className="text-sm">Model Name: </span>
              <span className="font-semibold text-sm">
                {p.model_name || p.name}
              </span>
            </div>
            <div className="line-clamp-1">
              <span className="text-sm">Model Number: </span>
              <span className="font-semibold text-sm">{p.model_number}</span>
            </div>
            <div className="line-clamp-1">
              <span className="text-sm">Sub Category: </span>
              <span className="font-semibold text-sm">
                {p.sub_category || subCategoryName}
              </span>
            </div>

            <div className="line-clamp-1">
              <span className="text-sm">Warranty: </span>
              <span className="font-semibold text-sm">{p.warranty}</span>
            </div>
          </div>

          {p.price != null && (
            <span className="mt-auto pt-2 text-sm font-semibold text-[#E91C1C]">
              {formatPrice(p.price)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

/* List row — keeps the full detail set, since there's room for it here */
const ProductListCard = ({ p, subCategoryName }) => (
  <Link
    to={`/baltra-product-view/${p.id}`}
    className="group bg-white rounded-xl border border-[#EDE6D9] hover:border-[#E91C1C]/40 hover:shadow-md transition-all overflow-hidden flex items-center gap-4 sm:gap-6 p-4 sm:p-5"
  >
    <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#F1EAD9] rounded-lg">
      <img
        src={p.main_image_url}
        alt={p.model_name || p.name}
        loading="lazy"
        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
      <DetailRow label="Model Name" value={p.model_name || p.name} />
      <DetailRow label="Model Number" value={p.model_number} />
      <DetailRow
        label="Sub Category"
        value={p.sub_category || subCategoryName}
      />

      <DetailRow label="Warranty" value={p.warranty} />
    </div>
    {p.price != null && (
      <span className="text-sm font-semibold text-[#E91C1C] shrink-0">
        {formatPrice(p.price)}
      </span>
    )}
  </Link>
);

/* Main export: renders grid or list based on `view` */
const ProductGrid = ({ products, subCategoryName, view = "grid" }) => {
  if (view === "list") {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        {products.map((p) => (
          <ProductListCard key={p.id} p={p} subCategoryName={subCategoryName} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {products.map((p) => (
        <ProductGridCard key={p.id} p={p} subCategoryName={subCategoryName} />
      ))}
    </div>
  );
};

export default ProductGrid;
