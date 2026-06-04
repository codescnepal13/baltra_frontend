import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useCallback, useMemo, useState } from "react";
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
import BaltraLogo from "../../../assets/images/redBaltraLogoImg.png";
import LogoutPopUp from "../../../components/layout/logoutPopUp/LogoutPopUp";
import SideBarLayout from "../../../components/layout/sideBarLayout/SideBarLayout";
import { setLogout } from "../../../redux/features/auth/authSlice";
import { baltraSearchProducts } from "../../../redux/features/product/productSlice";

const BaltraSubCategoryHeader = () => {
  const { isAuthenticated, customer } = useSelector((state) => state.auth);
  const authToken = localStorage.getItem("AuthID");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShownDropDown, setIsShownDropDown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [product_name, setProductName] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowMenu = useMemo(() => {
    return () => {
      setShowSidebar(!showSidebar);
    };
  }, [showSidebar]);

  // Handle search when Enter is pressed
  const handleSearch = useCallback(() => {
    const query = {
      product_name: product_name || "",
    };
    dispatch(baltraSearchProducts(query));

    navigate("/baltra-search-products", {
      state: { query },
    });
  }, [dispatch, product_name, navigate]);

  // Handle input change
  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  // Handle key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleShowDropdown = () => {
    setIsShownDropDown(!isShownDropDown);
  };
  const handleDropdownClose = () => {
    setIsShownDropDown(false);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    enqueueSnackbar("Logout SuccessFully", {
      variant: "success",
    });
    navigate("/baltra-allProducts");
  };

  /* Open modal; also close dropdown immediately so it doesn't linger */
  const openLogoutModal = () => {
    setIsShownDropDown(false);
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => setShowLogoutModal(false);

  if (authToken) {
    try {
      const decodedData = jwtDecode(authToken);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decodedData.exp && decodedData.exp < currentTimeInSeconds) {
        dispatch(setLogout());
        localStorage.clear();
        navigate("/baltra-allProducts");
        enqueueSnackbar("session expired,login first", {
          variant: "warning",
        });
      }
    } catch (error) {
      dispatch(setLogout());
      localStorage.clear();
      navigate("/");
    }
  }
  return (
    <>
      <div className="font-gothamNarrow text-[#000000] relative w-full h-16 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {/* Logo */}
        <NavLink to="/baltra-aboutUs-Page">
          <img className="h-8 sm:h-8 md:h-10" src={BaltraLogo} alt="Logo" />
        </NavLink>

        {/* HiMiniBars3 Icon for Small Screens */}
        <button className="md:hidden" onClick={handleShowMenu}>
          <HiMiniBars3 className="text-black w-6 h-6" />
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 ml-4 lg:ml-8 font-gothamNarrow">
          <NavLink
            to="/baltra-aboutUs-Page"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline font-bold"
                : "text-[#000000] hover:text-red-600 hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">About Us</span>
          </NavLink>
          <NavLink
            to="/baltra-allProducts"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline font-bold"
                : "text-[#000000] hover:text-red-600 hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">Our Products</span>
          </NavLink>
          <NavLink
            to="/baltra-catalog"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline font-bold"
                : "text-[#000000] hover:text-red-600 hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">E-Catalogue</span>
          </NavLink>
          <NavLink
            to="/baltra-trackingProducts"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline font-bold"
                : "text-[#000000] hover:text-red-600 hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">Service and Support</span>
          </NavLink>
          <NavLink
            to="/baltra-contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 underline font-bold"
                : "text-[#000000] hover:text-red-600 hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">Contact Us</span>
          </NavLink>
        </div>

        {/* Search and Login for Large Screens */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <div className="w-32 sm:w-40 lg:w-56 h-8 sm:h-10 p-2 bg-[rgba(255,255,255,0.09)] rounded-[35px] border border-[#000000] flex justify-start items-center relative">
            <HiSearch className="absolute left-2 text-[#000000] w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            <input
              type="text"
              placeholder="Search"
              value={product_name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none text-[#000000] text-xs sm:text-sm lg:text-base font-gothamNarrow font-normal placeholder-[#928686] focus:outline-none pl-8 sm:pl-10"
            />
          </div>

          <div className="relative">
            {isAuthenticated ? (
              <div className="flex items-center">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={handleShowDropdown}
                >
                  {customer?.image_url ? (
                    <img
                      src={customer?.image_url}
                      alt="avatar Img"
                      className="w-6 h-6 rounded-full align-middle"
                    />
                  ) : (
                    <HiOutlineUserCircle size={28} />
                  )}
                  <span className="text-sm text-[#000000] font-gothamNarrow">
                    {customer?.firstname}
                  </span>
                </button>
                {isShownDropDown && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    className="
                    absolute right-0 top-full mt-4 w-[230px]
                    bg-white border border-slate-200/80
                    rounded-2xl overflow-hidden z-50
                                 "
                  >
                    {/* ── Identity header ── */}
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
                      <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-[13px] font-semibold text-red-600 leading-none select-none">
                          {customer
                            ? [customer.firstname, customer.lastname]
                                .filter(Boolean)
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()
                            : "U"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-gray-800 truncate leading-tight">
                          {[customer?.firstname, customer?.lastname]
                            .filter(Boolean)
                            .join(" ") || "My Account"}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {customer?.email}
                        </p>
                      </div>
                    </div>

                    {/* ── Menu items ── */}
                    <ul role="none" className="p-1.5 flex flex-col gap-0.5">
                      {/* My Account */}
                      <li role="menuitem">
                        <NavLink
                          to="/baltra-profileInformation"
                          onClick={handleDropdownClose}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-slate-50 hover:text-gray-900 transition-colors duration-100 group"
                        >
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-50 transition-colors">
                            <HiOutlineUserCircle
                              size={15}
                              className="text-slate-500 group-hover:text-red-500"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-[13px] font-medium">
                            My Account
                          </span>
                        </NavLink>
                      </li>

                      {/* My Products */}
                      <li role="menuitem">
                        <NavLink
                          to="/baltra-user-ProductPage"
                          onClick={handleDropdownClose}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-slate-50 hover:text-gray-900 transition-colors duration-100 group"
                        >
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-50 transition-colors">
                            <AiOutlineProduct
                              size={15}
                              className="text-slate-500 group-hover:text-red-500"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-[13px] font-medium">
                            My Products
                          </span>
                        </NavLink>
                      </li>

                      {/* Service Ticket */}
                      <li role="menuitem">
                        <NavLink
                          to="/baltra-trackingProducts"
                          onClick={handleDropdownClose}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-slate-50 hover:text-gray-900 transition-colors duration-100 group"
                        >
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-50 transition-colors">
                            <MdOutlineMedicalServices
                              size={15}
                              className="text-slate-500 group-hover:text-red-500"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-[13px] font-medium">
                            Service Ticket
                          </span>
                        </NavLink>
                      </li>

                      {/* Bulk Order History */}
                      <li role="menuitem">
                        <NavLink
                          to="/baltra-bulk-quote"
                          onClick={handleDropdownClose}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-slate-50 hover:text-gray-900 transition-colors duration-100 group"
                        >
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-50 transition-colors">
                            <GoStack
                              size={15}
                              className="text-slate-500 group-hover:text-red-500"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-[13px] font-medium">
                            Bulk Order History
                          </span>
                        </NavLink>
                      </li>

                      {/* Admin Dashboard — only for admins */}
                      {customer?.role === "admin" && (
                        <>
                          <li
                            role="separator"
                            className="h-px bg-slate-100 mx-1 my-0.5"
                          />
                          <li role="menuitem">
                            <NavLink
                              to="/baltra-admin-dashboard"
                              onClick={handleDropdownClose}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-100 group"
                            >
                              <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                <MdOutlineDashboardCustomize
                                  size={15}
                                  className="text-slate-500 group-hover:text-blue-500"
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="text-[13px] font-medium flex-1">
                                Dashboard
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                                Admin
                              </span>
                            </NavLink>
                          </li>
                        </>
                      )}

                      {/* Divider + Logout */}
                      <li
                        role="separator"
                        className="h-px bg-slate-100 mx-1 my-0.5"
                      />

                      <li role="menuitem">
                        <button
                          onClick={openLogoutModal}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-100 group"
                        >
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                            <GoSignOut
                              size={15}
                              className="text-slate-500 group-hover:text-red-500"
                              aria-hidden="true"
                            />
                          </span>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-[13px] font-medium leading-none">
                              Log out
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5 group-hover:text-red-400">
                              End current session
                            </p>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/baltra-account-signin">
                <div className="font-gothamNarrow flex items-center space-x-2 bg-white rounded-full px-2 sm:px-4 py-1 text-black cursor-pointer">
                  <HiOutlineUser className="w-4 h-4" />
                  <div className="hidden sm:block font-gothamNarrow text-[#000000] text-xs sm:text-sm">
                    Login
                  </div>
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Tablet and Mobile Navigation */}

      <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 z-50 lg:hidden w-full p-2 sm:p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Home */}
          <NavLink
            to="/baltra-aboutUs-Page"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-medium"
                : "text-gray-600 hover:text-gray-500 flex flex-col items-center"
            }
          >
            <FaHome size={24} />
            <span className="text-xs sm:text-sm mt-1">Home</span>
          </NavLink>

          {/* Catalog or Tracking */}
          <div className="relative text-gray-600 hover:text-gray-700 flex flex-col items-center">
            {isAuthenticated && customer ? (
              <NavLink
                to="/baltra-trackingProducts"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-medium"
                    : "text-gray-600 hover:text-gray-500 flex flex-col items-center"
                }
              >
                <RiCustomerService2Line size={24} />
                <span className="text-xs sm:text-sm mt-1">Track</span>
              </NavLink>
            ) : (
              <NavLink
                to="/baltra-catalog"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-medium"
                    : "text-gray-600 hover:text-gray-500 flex flex-col items-center"
                }
              >
                <FaBookOpen size={24} />
                <span className="text-xs sm:text-sm mt-1">Catalog</span>
              </NavLink>
            )}
          </div>

          {/* All Products */}
          <NavLink
            to="/baltra-allProducts"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-medium"
                : "text-gray-600 hover:text-gray-500 flex flex-col items-center"
            }
          >
            <AiOutlineProduct size={24} />
            <span className="text-xs sm:text-sm mt-1">Products</span>
          </NavLink>

          {/* Profile or Sign-in */}
          {isAuthenticated && customer ? (
            <NavLink
              to="/baltra-profileInformation"
              className="flex flex-col items-center"
            >
              <button className="focus:outline-none flex flex-col items-center">
                {customer?.image_url ? (
                  <img
                    src={customer?.image_url}
                    className="w-8 h-8 sm:h-10 rounded-full object-contain"
                  />
                ) : (
                  <HiOutlineUserCircle
                    size={28}
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-600 font-medium"
                        : "text-gray-600 hover:text-gray-500 flex flex-col items-center"
                    }
                  />
                )}
                <span className="text-xs sm:text-sm mt-1">Profile</span>
              </button>
            </NavLink>
          ) : (
            <NavLink
              to="/baltra-account-signin"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-medium"
                  : "text-gray-600 hover:text-gray-500 flex flex-col items-center"
              }
            >
              <MdPersonOutline size={24} />
              <span className="text-xs sm:text-sm mt-1">Sign In</span>
            </NavLink>
          )}
        </div>
      </nav>
      {showSidebar && (
        <SideBarLayout
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}

      {/* ── Logout confirmation modal ── */}
      {showLogoutModal && (
        <LogoutPopUp onClose={closeLogoutModal} handleLogout={handleLogout} />
      )}
    </>
  );
};

export default BaltraSubCategoryHeader;
