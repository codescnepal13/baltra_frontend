import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import baltraAdminLogo from "../../../assets/images/baltraAdminLogo.png";
import MetaData from "../../layout/metaData/MetaData";
import AdminHeader from "../adminHeader/AdminHeader";
import { items } from "../routes/MenuItems";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const navigate = useNavigate();

  const dashboardKey = items.find((item) => item.label === "Dashboard")?.key;

  useEffect(() => {
    const storedParent = localStorage.getItem("selectedParent");
    const storedChild = localStorage.getItem("selectedChild");
    if (storedParent) {
      setSelectedParent(storedParent);
    } else if (dashboardKey) {
      setSelectedParent(dashboardKey);
    }
    if (storedChild) {
      setSelectedChild(storedChild);
    }
  }, [dashboardKey]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleParentClick = (parentKey, label) => {
    if (label === "Dashboard") {
      navigate("/baltra-admin-dashboard");
    } else {
      const newSelectedParent = selectedParent === parentKey ? null : parentKey;
      setSelectedParent(newSelectedParent);
      localStorage.setItem("selectedParent", newSelectedParent);
      setSelectedChild("");
      localStorage.removeItem("selectedChild");
    }
  };

  const handleChildClick = (childKey) => {
    setSelectedChild(childKey);
    localStorage.setItem("selectedChild", childKey);
  };

  const latestFullYear = new Date().getFullYear();

  return (
    <>
      <MetaData title="baltra-admin-dashboard" />
      <div
        className={`font-gothamNarrow flex h-screen bg-gray-100 ${
          collapsed ? "lg:ml-80 2xl:ml-96" : "lg:ml-0 2xl:ml-0"
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 bg-[#363740] overflow-x-hidden transition-transform transform ease-in-out duration-300 flex flex-col ${
            collapsed ? "-translate-x-full" : "translate-x-0"
          } lg:translate-x-0 lg:static lg:inset-0 w-44 sm:w-48 md:w-52 lg:w-56 xl:w-64 2xl:w-72`}
        >
          <div className="flex flex-col items-center justify-center bg-gray-800 p-4">
            <Link to={"#"}>
              <img
                src={baltraAdminLogo}
                alt="Company Logo"
                className="h-8 img-fluid"
              />
            </Link>
            <p className="font-gothamNarrow text-center text-xs text-white mt-2 whitespace-nowrap">
              V1.0.1
            </p>
          </div>

          <nav className="mt-5 px-2 space-y-1 overflow-y-auto flex-1">
            {items &&
              items.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    onClick={() => handleParentClick(item.key, item.label)}
                    className={`pl-3 cursor-pointer whitespace-nowrap overflow-hidden ${
                      selectedParent === item.key
                        ? "bg-[#484849] font-normal"
                        : ""
                    }`}
                  >
                    <div className="font-gothamNarrow group flex items-center px-2 py-2 text-base font-medium text-[#DDE2FF] hover:text-[#ffffff] tracking-normal">
                      {item.icon && <div className="mr-4">{item.icon}</div>}
                      {item.label}
                      {item.label !== "Dashboard" && (
                        <span className="ml-auto">
                          {selectedParent === item.key ? (
                            <FaAngleDown />
                          ) : (
                            <FaAngleRight />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="ml-3 transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: selectedParent === item.key ? "500px" : "0",
                      overflow: "hidden",
                      marginTop: selectedParent === item.key ? "10px" : "0",
                    }}
                  >
                    {selectedParent === item.key &&
                      item?.children?.map((child) => (
                        <Link
                          key={child.key.toLowerCase()}
                          to={child.key.toLowerCase()}
                          className={`group flex items-center px-4 py-2 text-sm whitespace-nowrap ${
                            selectedParent === item.key ? "bg-gray-700" : ""
                          } ${
                            selectedChild === child.key.toLowerCase()
                              ? "bg-red-600"
                              : ""
                          } text-[#DDE2FF] hover:text-[#ffffff]`}
                          onClick={() =>
                            handleChildClick(child.key.toLowerCase())
                          }
                        >
                          {child.icon && (
                            <div className="mr-2">{child.icon}</div>
                          )}
                          {child.label}
                        </Link>
                      ))}
                  </div>
                </React.Fragment>
              ))}
          </nav>

          <div className="mt-auto p-4 text-center text-sm text-[#DDE2FF] border-t border-gray-600 font-gothamNarrow">
            <p>© {latestFullYear} All Rights Reserved Baltra</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        </div>
      </div>
      <button
        onClick={toggleCollapsed}
        className="fixed left-0 top-0 z-50 p-4 cursor-pointer transition-transform transform ease-in-out duration-300 lg:hidden"
      >
        {collapsed ? (
          <FiChevronsRight className="h-6 w-6" />
        ) : (
          <FiChevronsLeft className="h-6 w-6" />
        )}
      </button>
    </>
  );
};

export default MainLayout;

// import React, { useEffect, useState } from "react";
// import { FaAngleDown, FaAngleRight } from "react-icons/fa";
// import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import baltraAdminLogo from "../../../assets/images/baltraAdminLogo.png";
// import MetaData from "../../layout/metaData/MetaData";
// import AdminHeader from "../adminHeader/AdminHeader";
// import { items } from "../routes/MenuItems";

// const MainLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedParent, setSelectedParent] = useState("");
//   const [selectedChild, setSelectedChild] = useState("");
//   const navigate = useNavigate();

//   const latestFullYear = new Date().getFullYear();

//   const dashboardKey = items.find((item) => item.label === "Dashboard")?.key;

//   useEffect(() => {
//     const storedParent = localStorage.getItem("selectedParent");
//     const storedChild = localStorage.getItem("selectedChild");
//     if (storedParent) {
//       setSelectedParent(storedParent);
//     } else if (dashboardKey) {
//       setSelectedParent(dashboardKey);
//     }
//     if (storedChild) {
//       setSelectedChild(storedChild);
//     }
//   }, [dashboardKey]);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   const handleParentClick = (parentKey, label) => {
//     if (label === "Dashboard") {
//       navigate("/baltra-admin-dashboard");
//     } else {
//       const newSelectedParent = selectedParent === parentKey ? "" : parentKey;
//       setSelectedParent(newSelectedParent);
//       localStorage.setItem("selectedParent", newSelectedParent);
//       setSelectedChild("");
//       localStorage.removeItem("selectedChild");
//     }
//   };

//   const handleChildClick = (childKey) => {
//     setSelectedChild(childKey);
//     localStorage.setItem("selectedChild", childKey);
//   };

//   return (
//     <>
//       <MetaData title="baltra-admin-dashboard" />
//       <div
//         className={`font-gothamNarrow flex h-screen bg-gray-100 transition-all ${
//           collapsed ? "lg:ml-20" : "lg:ml-72"
//         }`}
//       >
//         <div
//           className={`fixed inset-y-0 left-0 bg-[#363740] overflow-hidden transition-all duration-300 ${
//             collapsed ? "w-20" : "w-72"
//           }`}
//         >
//           <div className="flex flex-col items-center justify-center bg-gray-800 p-4">
//             <Link to={"#"}>
//               <img src={baltraAdminLogo} alt="Company Logo" className="h-8" />
//             </Link>
//             <p
//               className={`font-gothamNarrow text-xs text-white mt-2 ${
//                 collapsed ? "hidden" : "block"
//               }`}
//             >
//               V1.0.1
//             </p>
//           </div>

//           <nav className="mt-5 px-2 space-y-1 overflow-y-auto">
//             {items.map((item, index) => (
//               <React.Fragment key={index}>
//                 <div
//                   onClick={() => handleParentClick(item.key, item.label)}
//                   className={`pl-3 cursor-pointer whitespace-nowrap overflow-hidden ${
//                     selectedParent === item.key ? "bg-[#484849]" : ""
//                   }`}
//                 >
//                   <div className="font-gothamNarrow flex items-center px-2 py-2 text-base text-[#DDE2FF] hover:text-white">
//                     {item.icon && <div className="mr-4">{item.icon}</div>}
//                     {!collapsed && item.label}
//                     {item.label !== "Dashboard" && (
//                       <span className="ml-auto">
//                         {selectedParent === item.key ? (
//                           <FaAngleDown />
//                         ) : (
//                           <FaAngleRight />
//                         )}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 {!collapsed && selectedParent === item.key && (
//                   <div className="ml-3 transition-all duration-300 ease-in-out">
//                     {item.children?.map((child) => (
//                       <Link
//                         key={child.key.toLowerCase()}
//                         to={child.key.toLowerCase()}
//                         className={`group flex items-center px-4 py-2 text-sm text-[#DDE2FF] hover:text-white ${
//                           selectedChild === child.key.toLowerCase()
//                             ? "bg-red-600"
//                             : ""
//                         }`}
//                         onClick={() =>
//                           handleChildClick(child.key.toLowerCase())
//                         }
//                       >
//                         {child.icon && <div className="mr-2">{child.icon}</div>}
//                         {child.label}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </nav>
//           <div className="mt-auto py-2 px-6 border-t text-white text-sm">
//             © {latestFullYear} Baltra. All rights reserved.
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col overflow-hidden">
//           <AdminHeader
//             collapsed={collapsed}
//             toggleCollapsed={toggleCollapsed}
//           />
//         </div>
//       </div>

//       <button
//         onClick={toggleCollapsed}
//         className="fixed left-2 top-2 z-50 p-2 bg-gray-800 text-white rounded-full transition-all lg:hidden"
//       >
//         {collapsed ? (
//           <FiChevronsRight className="h-6 w-6" />
//         ) : (
//           <FiChevronsLeft className="h-6 w-6" />
//         )}
//       </button>
//     </>
//   );
// };

// export default MainLayout;
