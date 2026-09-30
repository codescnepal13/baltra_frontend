import moment from "moment";
import { memo } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const RED = { color: "text-red-500", bg: "bg-red-50", dot: "bg-red-500" };
const YELLOW = {
  color: "text-yellow-600",
  bg: "bg-yellow-50",
  dot: "bg-yellow-500",
};
const BLUE = { color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-500" };
const GREEN = {
  color: "text-green-600",
  bg: "bg-green-50",
  dot: "bg-green-500",
};
const GRAY = { color: "text-gray-500", bg: "bg-gray-100", dot: "bg-gray-400" };

const STATUS_CONFIG = {
  "Un-Assigned": RED,
  Unassigned: RED,
  Completed: GREEN,
  "Service Center Allocated": YELLOW,
  "Service Center Assigned": YELLOW,
  "Part Approval Pending from ASM": YELLOW,
  "Part Pending from HO": YELLOW,
  "Parts in Transit": YELLOW,
  "Part Consumed by Service Center": YELLOW,
  "Engineer Allocated": BLUE,
  "On Service": BLUE,
};

// Shared by the header and every row so columns always line up
export const ROW_GRID =
  "md:grid md:grid-cols-[1.1fr_1.7fr_1.2fr_1.2fr_1.6fr_1.1fr_20px] md:gap-4 md:items-center";

export const BaltraTrackingHeader = () => (
  <div
    className={`hidden ${ROW_GRID} px-4 py-3 bg-gray-50 border-b border-gray-200 text-[11px] font-semibold uppercase tracking-wider text-gray-500 font-gothamNarrow`}
  >
    <span>Job ID</span>
    <span>Model</span>
    <span>Model No.</span>
    <span>Sent for</span>
    <span>Status</span>
    <span>Date</span>
    <span />
  </div>
);

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || GRAY;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-gothamNarrow max-w-full ${cfg.bg} ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      <span className="truncate">{status || "Unknown"}</span>
    </span>
  );
};

const BaltraTrackingCard = ({ item }) => {
  const date = item?.date_joined
    ? moment(item.date_joined).format("DD MMM YYYY")
    : "—";

  return (
    <Link
      to={`/baltra-tracking-ProductDetails/${item.id}`}
      className="block px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-red-50/40 transition-colors font-gothamNarrow"
    >
      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 min-w-0">
            {item.model_name || "—"}
          </h3>
          <div className="shrink-0 max-w-[150px]">
            <StatusBadge status={item.status} />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>
            Job ID:{" "}
            <b className="text-red-500 font-semibold">{item.job_no || "—"}</b>
          </span>
          <span className="text-gray-400">{date}</span>
        </div>
        <div className="text-xs text-gray-500 line-clamp-1">
          {item.model_num || "—"} · {item.problem_type || "—"}
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className={`hidden ${ROW_GRID} text-sm text-gray-700`}>
        <span className="font-semibold text-red-500 truncate">
          {item.job_no || "—"}
        </span>
        <span className="font-semibold text-gray-900 truncate">
          {item.model_name || "—"}
        </span>
        <span className="truncate">{item.model_num || "—"}</span>
        <span className="truncate">{item.problem_type || "—"}</span>
        <span className="min-w-0">
          <StatusBadge status={item.status} />
        </span>
        <span className="text-gray-500">{date}</span>
        <FiChevronRight className="text-gray-300" />
      </div>
    </Link>
  );
};

export default memo(BaltraTrackingCard);
