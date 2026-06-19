import { motion } from "framer-motion";
import moment from "moment";
import { Link } from "react-router-dom";

const STATUS_CONFIG = {
  "Un-Assigned": { color: "text-red-500", bg: "bg-red-50", dot: "bg-red-500" },
  Completed: {
    color: "text-green-600",
    bg: "bg-green-50",
    dot: "bg-green-500",
  },
  "Service Center Allocated": {
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    dot: "bg-yellow-500",
  },
  "Service Center Assigned": {
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    dot: "bg-yellow-500",
  },
  "Engineer Allocated": {
    color: "text-blue-600",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
  },
  "On Service": {
    color: "text-blue-600",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
  },
  Cancelled: { color: "text-gray-500", bg: "bg-gray-100", dot: "bg-gray-400" },
  "Cancelled Not Approved By Customer": {
    color: "text-gray-500",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
  "Cancelled Not Approved By HO": {
    color: "text-gray-500",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
  "Product Delivered": {
    color: "text-gray-500",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
  "Happy Calling Completed": {
    color: "text-gray-500",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
  "Request For Cancel": {
    color: "text-gray-500",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
  "Request For Close": {
    color: "text-gray-500",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
  "Transfer To Third Party": {
    color: "text-gray-500",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
};

const DEFAULT_STATUS = {
  color: "text-gray-700",
  bg: "bg-gray-100",
  dot: "bg-gray-400",
};

// min-h-[20px] keeps every row the same height even when value is "—"
const Row = ({ label, value, valueClass = "" }) => (
  <div className="flex items-baseline gap-2 text-sm font-gothamNarrow min-h-[20px]">
    <span className="font-semibold text-gray-600 w-28 sm:w-32 shrink-0">
      {label}
    </span>
    <span
      className={`text-gray-800 leading-snug line-clamp-1 break-all ${valueClass}`}
    >
      {value || "—"}
    </span>
  </div>
);

const BaltraTrackingCard = ({ item }) => {
  const statusCfg = STATUS_CONFIG[item.status] || DEFAULT_STATUS;

  return (
    <Link
      to={`/baltra-tracking-ProductDetails/${item.id}`}
      className="h-full block"
    >
      <motion.div
        whileHover={{
          boxShadow:
            "0 4px 20px rgba(220, 38, 38, 0.12), 0 1px 6px rgba(0,0,0,0.06)",
          y: -2,
          transition: { duration: 0.18, ease: "easeOut" },
        }}
        // slightly taller + flex-col so the footer line always has room to breathe
        // before the bottom accent bar
        className="mt-2 h-full sm:h-[196px] bg-white rounded-md border border-gray-200 overflow-hidden flex flex-col"
      >
        <div className="flex flex-col sm:flex-row flex-1 min-h-0">
          {/* ── Image panel ── */}
          <div className="sm:w-36 md:w-40 lg:w-44 shrink-0 bg-gray-50 flex items-center justify-center p-2.5 border-b sm:border-b-0 sm:border-r border-gray-100">
            <img
              className="w-full h-28 sm:h-full object-contain"
              src={item.damaged_image || item.product_image}
              alt={item.model_name}
            />
          </div>

          {/* ── Content panel ── */}
          <div className="flex flex-col flex-1 min-w-0 px-4 pt-3 pb-2.5 gap-1.5">
            {/* Top: model name + status badge */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-900 font-gothamNarrow leading-tight line-clamp-1 min-w-0">
                {item.model_name}
              </h3>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-gothamNarrow whitespace-nowrap shrink-0 max-w-[140px] truncate
                  ${statusCfg.bg} ${statusCfg.color}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusCfg.dot}`}
                />
                <span className="truncate">{item.status || "Unknown"}</span>
              </span>
            </div>

            {/* Detail rows */}
            <div className="flex flex-col gap-1">
              <Row label="Model Code" value={item.model_num} />
              <Row
                label="Job ID"
                value={item.job_no}
                valueClass="text-red-500 font-semibold"
              />
              <Row label="Sent for" value={item.problem_type} />
              <Row label="Complaint" value={item.problem_description} />
              <Row
                label="Complaint Date"
                value={moment(item?.date_joined || "").format(
                  "ddd, MMM D, YYYY",
                )}
              />
            </div>

            {/* Bottom: subtle "View details" cue — pinned to bottom with its own breathing room */}
            <div className="flex justify-end mt-auto pt-1 shrink-0">
              <span className="text-xs text-red-500 font-gothamNarrow font-medium tracking-wide leading-none">
                View details →
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent line — red for active, green for completed */}
        <div
          className={`h-0.5 w-full shrink-0 ${
            item.status === "Completed" ? "bg-green-400" : "bg-red-500"
          }`}
        />
      </motion.div>
    </Link>
  );
};

export default BaltraTrackingCard;
