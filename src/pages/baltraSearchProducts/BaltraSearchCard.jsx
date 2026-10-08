import React, { useState } from "react";
import { Link } from "react-router-dom";

const formatPrice = (price) =>
  price === null || price === undefined || price === ""
    ? null
    : `Rs. ${Number(price).toLocaleString("en-IN")}`;

const BaltraSearchCard = ({ item, view = "grid" }) => {
  const [imgError, setImgError] = useState(false);
  const isList = view === "list";

  const price = formatPrice(item.price);

  // Only show fields that actually have a value
  const specs = [
    { label: "Model Name", value: item.model_name },
    { label: "Model No.", value: item.model_num },
    { label: "Power", value: item.power },
    {
      label: "Warranty",
      value: item.warranty ? `${item.warranty} Months` : null,
    },
  ].filter((s) => s.value);

  return (
    <Link
      to={`/baltra-product-view/${item.id}`}
      className={`group bg-white border border-[#E4E4E4] transition-shadow duration-200 hover:shadow-lg hover:border-gray-300 ${
        isList ? "flex flex-col sm:flex-row" : "flex flex-col h-full"
      }`}
    >
      {/* Image: fixed box, image never stretches or expands */}
      <div
        className={`bg-[#F7F7F7] flex items-center justify-center overflow-hidden ${
          isList
            ? "w-full aspect-[4/3] sm:aspect-auto sm:w-[240px] sm:h-[220px] sm:shrink-0"
            : "w-full aspect-square"
        }`}
      >
        {imgError || !item?.image_url ? (
          <span className="text-xs text-gray-400 font-gothamNarrow">
            No image
          </span>
        ) : (
          <img
            src={item.image_url}
            alt={item.name || item.model_name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="max-w-full max-h-full w-auto h-auto object-contain p-4 mix-blend-multiply"
          />
        )}
      </div>

      {/* Details */}
      <div
        className={`flex flex-col flex-1 p-4 ${
          isList ? "sm:p-6 sm:justify-center" : ""
        }`}
      >
        <h3 className="text-base font-medium text-gray-900 font-gothamNarrow line-clamp-2 group-hover:text-red-600 transition-colors">
          {item.name}
        </h3>

        {price && (
          <p className="mt-1 text-lg font-semibold text-red-600 font-gothamNarrow">
            {price}
          </p>
        )}

        {specs.length > 0 && (
          <dl className="mt-3 pt-3 border-t border-[#E4E4E4] space-y-1.5 text-sm font-gothamNarrow">
            {specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-3">
                <dt className="text-[#A9A9A9] shrink-0">{s.label}</dt>
                <dd className="text-[#4A4A4A] font-semibold text-right truncate">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <span
          className={`mt-4 inline-flex items-center justify-center h-10 px-5 text-sm font-medium font-gothamNarrow border border-red-600 text-red-600 rounded-sm transition-colors group-hover:bg-red-600 group-hover:text-white ${
            isList ? "sm:self-start" : "mt-auto"
          }`}
        >
          View Details
        </span>
      </div>
    </Link>
  );
};

export default React.memo(BaltraSearchCard);
