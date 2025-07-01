import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";

const DataGrid = [
  {
    id: 1,
    icon: <IoBagHandle />,
    title: "Total Revenue",
    staticValue: "$120,000",
    path: "/nepal-cashmere/admin-dashboard/admin/monthly-revenue-list",
    color: "bg-blue-500",
  },
  {
    id: 2,
    icon: <IoPieChart />,
    title: "Total Products",
    staticValue: "250",
    path: "/nepal-cashmere/admin-dashboard/all/category-related-products",
    color: "bg-purple-500",
  },
  {
    id: 3,
    icon: <IoPeople />,
    title: "Total Customers",
    staticValue: "1,500",
    path: "/nepal-cashmere/admin-dashboard/all/admin-users",
    color: "bg-cyan-500",
  },
  {
    id: 4,
    icon: <IoCart />,
    title: "Customer Products",
    staticValue: "2,000",
    path: "/nepal-cashmere/admin-dashboard/all/admin-orders-list",
    color: "bg-yellow-500",
  },
];

const DashboardGrid = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {DataGrid.map((item) => (
          <WrapperBox key={item.id}>
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${item.color}`}
            >
              <span className="text-xl text-white">{item.icon}</span>
            </div>
            <Link to={item.path}>
              <div className="pl-4">
                <span className="text-sm text-gray-800 font-normal">
                  {item.title}
                </span>
                <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                    {item.staticValue}
                  </strong>
                </div>
              </div>
            </Link>
          </WrapperBox>
        ))}
      </div>
    </>
  );
};

export default DashboardGrid;

const WrapperBox = ({ children }) => {
  return (
    <div className="bg-white rounded-sm p-4 border border-gray-200">
      {children}
    </div>
  );
};
