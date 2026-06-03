import {
  IoBagHandle,
  IoCart,
  IoCube,
  IoMailOpen,
  IoPeople,
  IoPersonAdd,
  IoShieldCheckmark,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const DataGrid = [
  {
    id: 1,
    icon: <IoCube />,
    title: "Total Products",
    staticValue: "250",
    path: "/baltra/admin-dashboard/all/category-related-products",
    colorKey: "blue",
    trend: "+12% this month",
  },
  {
    id: 2,
    icon: <IoPeople />,
    title: "Total Users",
    staticValue: "1,500",
    path: "/baltra/admin-dashboard/all/admin-users",
    colorKey: "purple",
    trend: "+8% this month",
  },
  {
    id: 3,
    icon: <IoShieldCheckmark />,
    title: "Total Complaints",
    staticValue: "320",
    path: "/baltra/admin-dashboard/all/complaints",
    colorKey: "red",
    trend: "-3% this month",
  },
  {
    id: 4,
    icon: <IoPersonAdd />,
    title: "Registered Products",
    staticValue: "890",
    path: "/baltra/admin-dashboard/all/registered-products",
    colorKey: "teal",
    trend: "+21% this month",
  },
  {
    id: 5,
    icon: <IoMailOpen />,
    title: "Contact Enquiries",
    staticValue: "540",
    path: "/baltra/admin-dashboard/all/contact-enquiries",
    colorKey: "amber",
    trend: "+5% this month",
  },
  {
    id: 6,
    icon: <IoBagHandle />,
    title: "Bulk Orders",
    staticValue: "175",
    path: "/baltra/admin-dashboard/all/bulk-orders",
    colorKey: "green",
    trend: "+18% this month",
  },
  {
    id: 7,
    icon: <IoCart />,
    title: "Personalized Orders",
    staticValue: "98",
    path: "/baltra/admin-dashboard/all/personalized-orders",
    colorKey: "coral",
    trend: "+9% this month",
  },
];

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

const StatCard = ({ item }) => {
  const c = colorMap[item.colorKey];
  const isNegative = item.trend?.startsWith("-");

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
          {item.staticValue}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          {item.trend && (
            <span
              className={`text-xs font-medium ${isNegative ? "text-red-500" : c.trendColor}`}
            >
              {item.trend}
            </span>
          )}
          <span className="text-xs text-gray-300 group-hover:text-gray-400 transition-colors ml-auto flex items-center gap-0.5">
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

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {DataGrid.map((item) => (
        <StatCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default DashboardGrid;
