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

/* Detail row used inside both grid and list cards */
const DetailRow = ({ label, value }) => {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="text-sm">
      <span className="text-gray-500">{label}: </span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
};

/* View toggle */
export const ViewToggle = ({ view, onChange }) => (
  <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1 self-end">
    <button
      onClick={() => onChange("grid")}
      aria-label="Grid view"
      className={`p-1.5 rounded ${
        view === "grid" ? "bg-white shadow-sm text-[#E91C1C]" : "text-gray-400"
      }`}
    >
      <GridIcon className="w-4 h-4" />
    </button>
    <button
      onClick={() => onChange("list")}
      aria-label="List view"
      className={`p-1.5 rounded ${
        view === "list" ? "bg-white shadow-sm text-[#E91C1C]" : "text-gray-400"
      }`}
    >
      <ListIcon className="w-4 h-4" />
    </button>
  </div>
);

/* Grid card */
const ProductGridCard = ({ p, subCategoryName }) => (
  <Link
    to={`/baltra-product-view/${p.id}`}
    className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-[#E91C1C]/30 transition-all overflow-hidden flex flex-col"
  >
    <div className="w-full aspect-square flex items-center justify-center bg-gray-50 p-4">
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
    <div className="p-3 flex flex-col gap-1 border-t border-gray-100">
      <DetailRow label="Model Name" value={p.model_name || p.name} />
      <DetailRow label="Model Number" value={p.model_number} />
      <DetailRow
        label="Sub Category"
        value={p.sub_category || subCategoryName}
      />
      <DetailRow label="Warranty" value={p.warranty} />
      {p.price != null && (
        <span className="text-sm font-semibold text-[#E91C1C] mt-1">
          {formatPrice(p.price)}
        </span>
      )}
    </div>
  </Link>
);

/* List row */
const ProductListCard = ({ p, subCategoryName }) => (
  <Link
    to={`/baltra-product-view/${p.id}`}
    className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-[#E91C1C]/40 transition-all overflow-hidden flex items-center gap-4 sm:gap-6 p-4"
  >
    <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center bg-gray-50 rounded">
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
    <div className="flex-1 min-w-0 flex flex-col gap-1">
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
      <div className="flex flex-col gap-4">
        {products.map((p) => (
          <ProductListCard key={p.id} p={p} subCategoryName={subCategoryName} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((p) => (
        <ProductGridCard key={p.id} p={p} subCategoryName={subCategoryName} />
      ))}
    </div>
  );
};

export default ProductGrid;
