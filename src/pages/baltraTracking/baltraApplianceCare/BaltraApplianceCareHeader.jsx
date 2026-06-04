import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBookOpen, FaHome } from "react-icons/fa";
import { GoSignOut, GoStack } from "react-icons/go";
import { HiOutlineUser, HiOutlineUserCircle, HiSearch } from "react-icons/hi";
import { HiMiniBars3 } from "react-icons/hi2";
import {
  MdOutlineDashboardCustomize,
  MdOutlineMedicalServices,
  MdPersonOutline,
} from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ApplianceCareImg from "../../../assets/images/Appliance Care logo.png";
import LogoutPopUp from "../../../components/layout/logoutPopUp/LogoutPopUp";
import SideBarLayout from "../../../components/layout/sideBarLayout/SideBarLayout";
import { setLogout } from "../../../redux/features/auth/authSlice";
import { baltraSearchProducts } from "../../../redux/features/product/productSlice";

/* ── Helpers ──────────────────────────────────────────────── */
const getInitials = (customer) =>
  [customer?.firstname, customer?.lastname]
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

const getFullName = (customer) =>
  [customer?.firstname, customer?.lastname].filter(Boolean).join(" ") ||
  "My Account";

/* ── Avatar ───────────────────────────────────────────────── */
const Avatar = ({ customer, size = "sm" }) => {
  const dim = size === "sm" ? "w-8 h-8 text-[12px]" : "w-10 h-10 text-[13px]";
  return customer?.image_url ? (
    <img
      src={customer.image_url}
      alt="avatar"
      className={`${dim} rounded-full object-cover ring-2 ring-white/30`}
    />
  ) : (
    <div
      className={`${dim} rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center ring-2 ring-white/30 flex-shrink-0`}
    >
      <span className="font-semibold text-white font-gothamNarrow leading-none">
        {getInitials(customer)}
      </span>
    </div>
  );
};

/* ── NavLink helper ───────────────────────────────────────── */
const HeaderLink = ({ to, children }) => (
  <NavLink
    to={to}
    style={{ textUnderlineOffset: "6px" }}
    className={({ isActive }) =>
      `text-sm font-gothamNarrow transition-colors duration-150 ${
        isActive
          ? "text-red-400 underline font-medium"
          : "text-white/90 hover:text-white hover:underline"
      }`
    }
  >
    {children}
  </NavLink>
);

/* ── Dropdown menu item ───────────────────────────────────── */
const DropdownItem = ({ to, icon: Icon, label, badge, onClick, danger }) => {
  const base =
    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors duration-100 group w-full text-left";
  const colors = danger
    ? "text-gray-600 hover:bg-red-50 hover:text-red-700"
    : "text-gray-600 hover:bg-slate-50 hover:text-gray-900";
  const iconBg = danger
    ? "bg-slate-100 group-hover:bg-red-100"
    : "bg-slate-100 group-hover:bg-red-50";
  const iconColor = danger
    ? "text-slate-500 group-hover:text-red-500"
    : "text-slate-500 group-hover:text-red-500";

  const inner = (
    <>
      <span
        className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 transition-colors`}
      >
        <Icon size={15} className={iconColor} aria-hidden="true" />
      </span>
      <span className="text-[13px] font-medium font-gothamNarrow flex-1 leading-none">
        {label}
      </span>
      {badge && (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
          {badge}
        </span>
      )}
    </>
  );

  return (
    <li role="menuitem">
      {to ? (
        <NavLink to={to} onClick={onClick} className={`${base} ${colors}`}>
          {inner}
        </NavLink>
      ) : (
        <button onClick={onClick} className={`${base} ${colors}`}>
          {inner}
        </button>
      )}
    </li>
  );
};

/* ── Bottom nav item ──────────────────────────────────────── */
const BottomNavItem = ({ to, icon: Icon, label, customIcon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
        isActive ? "text-red-600" : "text-gray-500 hover:text-gray-800"
      }`
    }
  >
    {customIcon ?? <Icon size={22} />}
    <span className="text-[10px] font-semibold font-gothamNarrow tracking-wide">
      {label}
    </span>
  </NavLink>
);

/* ── Main component ───────────────────────────────────────── */
const BaltraApplianceCareHeader = () => {
  const { isAuthenticated, customer } = useSelector((state) => state.auth);
  const authToken = localStorage.getItem("AuthID");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShownDropDown, setIsShownDropDown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [product_name, setProductName] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const dropdownRef = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsShownDropDown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleShowMenu = useCallback(() => setShowSidebar((v) => !v), []);

  const handleSearch = useCallback(() => {
    const query = { product_name: product_name || "" };
    dispatch(baltraSearchProducts(query));
    navigate("/baltra-search-products", { state: { query } });
  }, [dispatch, product_name, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    enqueueSnackbar("Logout successfully", { variant: "success" });
    navigate("/baltra-allProducts");
  };

  const openLogoutModal = () => {
    setIsShownDropDown(false);
    setShowLogoutModal(true);
  };

  /* Token expiry check */
  if (authToken) {
    try {
      const decoded = jwtDecode(authToken);
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        dispatch(setLogout());
        localStorage.clear();
        navigate("/baltra-allProducts");
        enqueueSnackbar("Session expired, please login again", {
          variant: "warning",
        });
      }
    } catch {
      dispatch(setLogout());
      localStorage.clear();
      navigate("/");
    }
  }

  return (
    <>
      {/* ── Desktop / tablet header ── */}
      <header className="font-gothamNarrow relative w-full h-16 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {/* Logo */}
        <NavLink to="/baltra-aboutUs-Page" className="flex-shrink-0">
          <img
            className="h-8 md:h-10"
            src={ApplianceCareImg}
            alt="Baltra logo"
          />
        </NavLink>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={handleShowMenu}
          aria-label="Open menu"
        >
          <HiMiniBars3 className="text-white w-6 h-6" />
        </button>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 ml-6 lg:ml-10">
          <HeaderLink to="/baltra-aboutUs-Page">About Us</HeaderLink>
          <HeaderLink to="/baltra-allProducts">Our Products</HeaderLink>
          <HeaderLink to="/baltra-catalog">E-Catalogue</HeaderLink>
          <HeaderLink to="/baltra-trackingProducts">
            Service & Support
          </HeaderLink>
          <HeaderLink to="/baltra-contact-us">Contact Us</HeaderLink>
        </nav>

        {/* Search + auth */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Search pill */}
          <div className="flex items-center gap-2 w-36 lg:w-52 h-9 px-3 bg-white/10 hover:bg-white/15 border border-white/25 rounded-full transition-colors">
            <HiSearch className="text-white/70 w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search…"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none text-white text-sm font-gothamNarrow placeholder-white/40 focus:outline-none w-full"
            />
          </div>

          {/* Auth section */}
          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                {/* Avatar trigger */}
                <button
                  onClick={() => setIsShownDropDown((v) => !v)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/35 transition-all duration-200 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isShownDropDown}
                >
                  <Avatar customer={customer} size="sm" />
                  <div className="flex flex-col items-start min-w-0 max-w-[90px]">
                    <span className="text-[12px] font-semibold text-white font-gothamNarrow leading-tight truncate w-full">
                      {customer?.firstname}
                    </span>
                    <span className="text-[10px] text-white/55 font-gothamNarrow leading-tight">
                      My Account
                    </span>
                  </div>
                  {/* Chevron */}
                  <svg
                    className={`w-3 h-3 text-white/60 flex-shrink-0 transition-transform duration-200 ${
                      isShownDropDown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown panel */}
                {isShownDropDown && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    className="absolute right-0 top-full mt-3 w-[240px] bg-white border border-slate-200/70 rounded-2xl shadow-xl shadow-black/10 overflow-hidden z-50"
                  >
                    {/* Identity header */}
                    <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-br from-red-50 to-orange-50 border-b border-slate-100">
                      <Avatar customer={customer} size="lg" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight font-gothamNarrow">
                          {getFullName(customer)}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5 font-gothamNarrow">
                          {customer?.email}
                        </p>
                        {customer?.role === "admin" && (
                          <span className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-600">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Menu items */}
                    <ul role="none" className="p-1.5 flex flex-col gap-0.5">
                      <DropdownItem
                        to="/baltra-profileInformation"
                        icon={HiOutlineUserCircle}
                        label="My Account"
                        onClick={() => setIsShownDropDown(false)}
                      />
                      <DropdownItem
                        to="/baltra-user-ProductPage"
                        icon={AiOutlineProduct}
                        label="My Products"
                        onClick={() => setIsShownDropDown(false)}
                      />
                      <DropdownItem
                        to="/baltra-trackingProducts"
                        icon={MdOutlineMedicalServices}
                        label="Service Ticket"
                        onClick={() => setIsShownDropDown(false)}
                      />
                      <DropdownItem
                        to="/baltra-bulk-quote"
                        icon={GoStack}
                        label="Bulk Order History"
                        onClick={() => setIsShownDropDown(false)}
                      />

                      {customer?.role === "admin" && (
                        <>
                          <li
                            role="separator"
                            className="h-px bg-slate-100 mx-2 my-0.5"
                          />
                          <DropdownItem
                            to="/baltra-admin-dashboard"
                            icon={MdOutlineDashboardCustomize}
                            label="Dashboard"
                            badge="Admin"
                            onClick={() => setIsShownDropDown(false)}
                          />
                        </>
                      )}

                      <li
                        role="separator"
                        className="h-px bg-slate-100 mx-2 my-0.5"
                      />

                      {/* Logout — extra sub-label */}
                      <li role="menuitem">
                        <button
                          onClick={openLogoutModal}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-100 group"
                        >
                          <span className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors">
                            <GoSignOut
                              size={15}
                              className="text-slate-500 group-hover:text-red-500"
                            />
                          </span>
                          <div className="flex-1 text-left">
                            <p className="text-[13px] font-medium font-gothamNarrow leading-tight">
                              Log out
                            </p>
                            <p className="text-[11px] text-gray-400 group-hover:text-red-400 font-gothamNarrow">
                              End current session
                            </p>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <NavLink to="/baltra-account-signin">
                <div className="flex items-center gap-2 bg-white hover:bg-gray-50 rounded-full px-4 py-1.5 text-black cursor-pointer transition-colors shadow-sm">
                  <HiOutlineUser className="w-4 h-4" />
                  <span className="text-sm font-gothamNarrow font-medium">
                    Login
                  </span>
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* ── Bottom nav (mobile / tablet) ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/80 z-50 lg:hidden">
        <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
          <BottomNavItem to="/baltra-aboutUs-Page" icon={FaHome} label="Home" />

          {isAuthenticated && customer ? (
            <BottomNavItem
              to="/baltra-trackingProducts"
              icon={RiCustomerService2Line}
              label="Track"
            />
          ) : (
            <BottomNavItem
              to="/baltra-catalog"
              icon={FaBookOpen}
              label="Catalog"
            />
          )}

          <BottomNavItem
            to="/baltra-allProducts"
            icon={AiOutlineProduct}
            label="Products"
          />

          {isAuthenticated && customer ? (
            <NavLink
              to="/baltra-profileInformation"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                  isActive ? "text-red-600" : "text-gray-500"
                }`
              }
            >
              <Avatar customer={customer} size="sm" />
              <span className="text-[10px] font-semibold font-gothamNarrow tracking-wide mt-0.5">
                Profile
              </span>
            </NavLink>
          ) : (
            <BottomNavItem
              to="/baltra-account-signin"
              icon={MdPersonOutline}
              label="Sign In"
            />
          )}
        </div>
      </nav>

      {showSidebar && (
        <SideBarLayout
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}

      {showLogoutModal && (
        <LogoutPopUp
          onClose={() => setShowLogoutModal(false)}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default BaltraApplianceCareHeader;
