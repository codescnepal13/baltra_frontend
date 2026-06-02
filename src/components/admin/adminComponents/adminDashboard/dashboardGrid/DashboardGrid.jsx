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
    color: "bg-blue-500",
  },
  {
    id: 2,
    icon: <IoPeople />,
    title: "Total Users",
    staticValue: "1,500",
    path: "/baltra/admin-dashboard/all/admin-users",
    color: "bg-purple-500",
  },
  {
    id: 3,
    icon: <IoShieldCheckmark />,
    title: "Total Complaints",
    staticValue: "320",
    path: "/baltra/admin-dashboard/all/complaints",
    color: "bg-rose-500",
  },
  {
    id: 4,
    icon: <IoPersonAdd />,
    title: "Registered Products",
    staticValue: "890",
    path: "/baltra/admin-dashboard/all/registered-products",
    color: "bg-cyan-500",
  },
  {
    id: 5,
    icon: <IoMailOpen />,
    title: "Contact Enquiries",
    staticValue: "540",
    path: "/baltra/admin-dashboard/all/contact-enquiries",
    color: "bg-amber-500",
  },
  {
    id: 6,
    icon: <IoBagHandle />,
    title: "Bulk Orders",
    staticValue: "175",
    path: "/baltra/admin-dashboard/all/bulk-orders",
    color: "bg-green-500",
  },
  {
    id: 7,
    icon: <IoCart />,
    title: "Personalized Orders",
    staticValue: "98",
    path: "/baltra/admin-dashboard/all/personalized-orders",
    color: "bg-indigo-500",
  },
];

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {DataGrid.map((item) => (
        <WrapperBox key={item.id} path={item.path}>
          <div className="flex items-center gap-4">
            <div
              className={`rounded-full h-11 w-11 flex-shrink-0 flex items-center justify-center ${item.color}`}
            >
              <span className="text-xl text-white">{item.icon}</span>
            </div>
            <div className="min-w-0">
              <span className="block text-sm text-gray-500 font-normal truncate">
                {item.title}
              </span>
              <strong className="block text-xl text-gray-800 font-semibold leading-tight">
                {item.staticValue}
              </strong>
            </div>
          </div>
        </WrapperBox>
      ))}
    </div>
  );
};

export default DashboardGrid;

const WrapperBox = ({ children, path }) => {
  return (
    <Link to={path} className="block group">
      <div className="bg-white rounded-md p-4 border border-gray-200 transition-shadow duration-200 group-hover:shadow-md group-hover:border-gray-300">
        {children}
      </div>
    </Link>
  );
};
