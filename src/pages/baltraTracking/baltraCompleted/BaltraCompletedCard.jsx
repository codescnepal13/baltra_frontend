// BaltraCompletedCard.jsx
import { motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

// Fixed label width so every value starts at the same horizontal position,
// both within a card and across cards in the grid.
const InfoRow = ({ label, value, valueClass = "" }) => (
  <div className="flex items-baseline gap-1 min-h-[18px]">
    <span className="text-gray-500 shrink-0 w-[92px]">{label}</span>
    <span
      className={`font-semibold text-gray-800 leading-snug line-clamp-1 break-words min-w-0 ${valueClass}`}
    >
      {value || "—"}
    </span>
  </div>
);

const BaltraCompletedCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusStyles =
    item.status === "Un-Assigned"
      ? "bg-red-100 text-red-500"
      : item.status === "Completed"
        ? "bg-green-100 text-green-500"
        : "bg-gray-100 text-gray-500";

  return (
    <Link
      to={`/baltra-tracking-ProductDetails/${item.id}`}
      className="h-full block"
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          boxShadow:
            "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        animate={isHovered ? { opacity: 0.85 } : { opacity: 1 }}
        // h-full + flex-col so every card stretches evenly to match the
        // tallest card in its grid row, regardless of content length
        className="w-full h-full border border-gray-200 rounded-md font-gothamNarrow flex flex-col bg-white"
      >
        {/* Fixed-size image box keeps the top of every card identical */}
        <div className="w-full h-56 flex items-center justify-center p-3 border-b border-gray-100">
          <img
            className="max-w-full max-h-full object-contain"
            src={item?.damaged_image}
            alt={item?.model_name || "tracking image"}
          />
        </div>

        <div className="px-4 pt-2 text-gray-500 text-xs font-gothamNarrow">
          Product type
        </div>

        <div className="flex flex-col flex-1 px-4 pt-2 pb-3 text-sm gap-1">
          <InfoRow label="Model Name:" value={item.model_name} />
          <InfoRow label="Model No:" value={item.model_num} />
          <InfoRow
            label="Job ID:"
            value={item.job_no}
            valueClass="text-red-500"
          />
          <InfoRow label="Sent for:" value={item.problem_type} />

          <div className="flex items-baseline gap-1 min-h-[18px]">
            <span className="text-gray-500 shrink-0 w-[92px]">Stage:</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full truncate max-w-[140px] ${statusStyles}`}
            >
              {item.status || "Unknown"}
            </span>
          </div>

          <InfoRow
            label="Date:"
            value={moment(item?.date_joined || "").format("ddd, MMM D, YYYY")}
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default BaltraCompletedCard;
