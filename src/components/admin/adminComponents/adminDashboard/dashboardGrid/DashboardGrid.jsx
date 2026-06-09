import { useCallback, useEffect } from "react";
import {
  IoBagHandle,
  IoCart,
  IoCube,
  IoMailOpen,
  IoPeople,
  IoPersonAdd,
  IoRefresh,
  IoShieldCheckmark,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  adminStatisticsActionDashboard,
  clearAdminError,
} from "../../../../../redux/features/admin/adminSlice";

// ─── Color map ────────────────────────────────────────────────────────────────

const colorMap = {
  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trendColor: "text-blue-500",
    accent: "bg-blue-500",
  },
  purple: {
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    trendColor: "text-purple-500",
    accent: "bg-purple-500",
  },
  red: {
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    trendColor: "text-red-500",
    accent: "bg-red-500",
  },
  teal: {
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    trendColor: "text-teal-500",
    accent: "bg-teal-500",
  },
  amber: {
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trendColor: "text-amber-500",
    accent: "bg-amber-500",
  },
  green: {
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    trendColor: "text-green-500",
    accent: "bg-green-500",
  },
  coral: {
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    trendColor: "text-orange-500",
    accent: "bg-orange-500",
  },
};

// ─── Grid config ──────────────────────────────────────────────────────────────

const buildGrid = (stats) => [
  {
    id: 1,
    icon: <IoCube />,
    title: "Total Products",
    value: stats.total_products,
    path: "/baltra-admin-dashboard/all-products-list",
    colorKey: "blue",
  },
  {
    id: 2,
    icon: <IoPeople />,
    title: "Total Customers",
    value: stats.total_users,
    path: "/baltra-admin-dashboard/all-customer-list",
    colorKey: "purple",
  },
  {
    id: 3,
    icon: <IoShieldCheckmark />,
    title: "Total Complaints",
    value: stats.total_complaints,
    path: "/baltra-admin-dashboard/all/products-complaints-list",
    colorKey: "red",
  },
  {
    id: 4,
    icon: <IoPersonAdd />,
    title: "Registered Products",
    value: stats.total_registered_products,
    path: "/baltra-admin-dashboard/all/warranty-status-list",
    colorKey: "teal",
  },
  {
    id: 5,
    icon: <IoMailOpen />,
    title: "Contact Enquiries",
    value: stats.total_contact_enquiries,
    path: "/baltra-admin-dashboard/all-contact-message-list",
    colorKey: "amber",
  },
  {
    id: 6,
    icon: <IoBagHandle />,
    title: "Bulk Orders",
    value: stats.total_bulk_orders,
    path: "/baltra-admin-dashboard/all/bulk-quote-products",
    colorKey: "green",
  },
  {
    id: 7,
    icon: <IoCart />,
    title: "Personalized Orders",
    value: stats.total_personalized_orders,
    path: "/baltra-admin-dashboard/all/customize-products",
    colorKey: "coral",
  },
];

// ─── Skeleton card ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
    <div className="w-10 h-10 rounded-lg bg-gray-100 mb-4" />
    <div className="h-3 w-24 bg-gray-100 rounded mb-2" />
    <div className="h-7 w-16 bg-gray-100 rounded mb-4" />
    <div className="border-t border-gray-100 pt-3">
      <div className="h-3 w-20 bg-gray-100 rounded" />
    </div>
  </div>
);

// ─── Stat card ────────────────────────────────────────────────────────────────

const StatCard = ({ item }) => {
  const c = colorMap[item.colorKey];

  return (
    <Link
      to={item.path}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded-xl"
    >
      <div className="relative bg-white rounded-xl border border-gray-100 p-5 overflow-hidden transition-all duration-200 group-hover:border-gray-200 group-hover:shadow-sm group-hover:-translate-y-0.5">
        {/* Top accent bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        />

        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${c.iconBg}`}
        >
          <span className={`text-lg ${c.iconColor}`}>{item.icon}</span>
        </div>

        {/* Label */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1 truncate">
          {item.title}
        </p>

        {/* Value */}
        <p className="text-2xl font-semibold text-gray-900 leading-none mb-3">
          {item.value?.toLocaleString() ?? "—"}
        </p>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-end">
          <span className="text-xs text-gray-300 group-hover:text-gray-400 transition-colors flex items-center gap-0.5">
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5"
            >
              <path
                fillRule="evenodd"
                d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const DashboardGrid = () => {
  const dispatch = useDispatch();

  const { dashboardStats, loading, error } = useSelector(
    (state) => state.admin,
  );

  const fetchStats = useCallback(() => {
    dispatch(adminStatisticsActionDashboard());
  }, [dispatch]);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Clear errors
  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  const dataGrid = buildGrid(dashboardStats ?? {});

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-700">Overview</h2>
          {!loading && (
            <p className="text-xs text-gray-400 mt-0.5">
              Last updated just now
            </p>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchStats}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:text-gray-700 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          title="Refresh stats"
        >
          <IoRefresh
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
          <span>Failed to load stats.</span>
          <button
            onClick={fetchStats}
            className="underline underline-offset-2 hover:text-red-700 font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && !dashboardStats
          ? Array.from({ length: 7 }).map((_, i) => <SkeletonCard key={i} />)
          : dataGrid.map((item) => <StatCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default DashboardGrid;
