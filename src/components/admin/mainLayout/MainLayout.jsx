import React, { useEffect, useState } from "react";
import {
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import baltraAdminLogo from "../../../assets/images/baltraAdminLogo.png";
import MetaData from "../../layout/metaData/MetaData";
import AdminHeader from "../adminHeader/AdminHeader";
import { useMenuItems } from "../routes/MenuItems";

const SECTION_LABELS = {
  Dashboard: "Main",
  "Product Inventory": "Main",
  "Customer Products": "Main",
  "User Profiles": "Main",
  "Warranty Package": "Compliance",
  "Warrranty Complaints": "Compliance",
  Contacts: "Support",
  "Personalize Setting": "Settings",
  Settings: "Settings",
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openParent, setOpenParent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Call the hook — returns menu filtered by logged-in user's role
  const menuItems = useMenuItems();

  const currentPath = location.pathname;
  const isDashboardActive = currentPath === "/baltra-admin-dashboard";

  const getActiveChild = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (currentPath.includes(child.key.toLowerCase())) {
            return child.key.toLowerCase();
          }
        }
      }
    }
    return null;
  };

  const getActiveParent = () => {
    if (isDashboardActive) return "/admin/dashboard";
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (currentPath.includes(child.key.toLowerCase())) {
            return item.key;
          }
        }
      }
    }
    return null;
  };

  const activeParentKey = getActiveParent();
  const activeChildKey = getActiveChild();

  useEffect(() => {
    if (activeParentKey) setOpenParent(activeParentKey);
  }, [activeParentKey]);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const handleParentClick = (parentKey, label) => {
    if (label === "Dashboard") {
      navigate("/baltra-admin-dashboard");
      setOpenParent("/admin/dashboard");
    } else {
      setOpenParent((prev) => (prev === parentKey ? null : parentKey));
    }
  };

  const latestFullYear = new Date().getFullYear();

  const renderedSections = [];
  let lastSection = null;

  // ✅ use menuItems instead of items
  menuItems.forEach((item, index) => {
    const section = SECTION_LABELS[item.label] ?? null;
    if (section && section !== lastSection) {
      renderedSections.push({
        type: "label",
        label: section,
        key: `label-${section}-${index}`,
      });
      lastSection = section;
    }
    renderedSections.push({ type: "item", item, index });
  });

  return (
    <>
      <MetaData title="baltra-admin-dashboard" />

      <div className="font-inter flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 flex flex-col flex-shrink-0
            bg-[#1f2029]
            w-56 xl:w-60 2xl:w-64
            transition-transform duration-300 ease-in-out
            overscroll-contain
            ${collapsed ? "-translate-x-full" : "translate-x-0"}
            lg:translate-x-0
          `}
        >
          {/* Logo */}
          <div className="flex flex-col bg-[#16171f] px-5 pt-5 pb-4 border-b border-white/5">
            <Link to="/baltra-admin-dashboard">
              <img
                src={baltraAdminLogo}
                alt="Baltra Logo"
                className="h-7 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav
            className="flex-1 overflow-y-auto overscroll-contain px-2.5 py-3 space-y-0.5"
            style={{ scrollbarWidth: "thin" }}
          >
            {renderedSections.map((entry) => {
              if (entry.type === "label") {
                return (
                  <p
                    key={entry.key}
                    className="px-2.5 pt-4 pb-1.5 text-[9.5px] font-semibold tracking-[0.14em] uppercase text-white/20"
                  >
                    {entry.label}
                  </p>
                );
              }

              const { item, index } = entry;
              const isDashboard = item.label === "Dashboard";
              const isThisParentActive = activeParentKey === item.key;
              const isOpen = openParent === item.key;

              return (
                <React.Fragment key={index}>
                  <div
                    onClick={() => handleParentClick(item.key, item.label)}
                    className={`
                      relative flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer
                      text-[13px] font-normal tracking-[0.018em] leading-none
                      transition-colors duration-150 select-none
                      ${
                        isThisParentActive
                          ? "bg-red-500/10 text-[#ff7b7b]"
                          : "text-[#DDE2FF]/60 hover:bg-white/5 hover:text-[#DDE2FF]/85"
                      }
                    `}
                  >
                    {isThisParentActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-red-400 rounded-r-full" />
                    )}
                    {item.icon && (
                      <span className="w-4 text-center flex-shrink-0 text-base">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 whitespace-nowrap">
                      {item.label}
                    </span>
                    {!isDashboard && (
                      <FiChevronRight
                        className={`w-3 h-3 opacity-40 transition-transform duration-200 ${
                          isOpen ? "rotate-90 opacity-70" : ""
                        }`}
                      />
                    )}
                  </div>

                  {!isDashboard && (
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isOpen
                          ? `${(item.children?.length ?? 0) * 48}px`
                          : "0",
                      }}
                    >
                      {item?.children && (
                        <div className="ml-3 pl-3.5 border-l border-white/[0.06] mt-0.5 mb-1 flex flex-col gap-px">
                          {item.children.map((child) => {
                            const childKey = child.key.toLowerCase();
                            const isChildActive = activeChildKey === childKey;
                            return (
                              <Link
                                key={childKey}
                                to={childKey}
                                className={`
                                  relative flex items-center gap-2 px-2.5 py-[7px] rounded-md
                                  text-[12.5px] tracking-[0.016em] leading-none
                                  transition-colors duration-150 whitespace-nowrap
                                  ${
                                    isChildActive
                                      ? "bg-red-500/10 text-[#ff7b7b] font-medium"
                                      : "text-[#DDE2FF]/40 hover:text-[#DDE2FF]/75 hover:bg-white/[0.04]"
                                  }
                                `}
                              >
                                <span
                                  className={`flex-shrink-0 text-[13px] transition-all ${
                                    isChildActive
                                      ? "text-red-400"
                                      : "opacity-30"
                                  }`}
                                >
                                  {child.icon}
                                </span>
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-white/[0.06] text-center">
            <p className="text-[10.5px] tracking-[0.04em] text-white/20">
              © {latestFullYear} All rights reserved · Baltra
            </p>
          </div>
        </aside>

        <div
          className={`
            flex flex-col flex-1 min-w-0 overflow-hidden
            transition-[margin] duration-300 ease-in-out
            ${collapsed ? "ml-0" : "ml-0 lg:ml-56 xl:ml-60 2xl:ml-64"}
          `}
        >
          <AdminHeader
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
          <main
            className="flex-1 overflow-y-auto overscroll-contain"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <button
        onClick={toggleCollapsed}
        className="fixed left-0 top-0 z-50 p-4 cursor-pointer lg:hidden"
        aria-label="Toggle sidebar"
      >
        {collapsed ? (
          <FiChevronsRight className="h-5 w-5 text-gray-700" />
        ) : (
          <FiChevronsLeft className="h-5 w-5 text-gray-700" />
        )}
      </button>
    </>
  );
};

export default MainLayout;
