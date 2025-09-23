import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useCallback, useMemo, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { CiTrophy } from "react-icons/ci";
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
import userHeaderImg from "../../../assets/images/UserProductHeader.png";
import SideBarLayout from "../../../components/layout/sideBarLayout/SideBarLayout";
import { setLogout } from "../../../redux/features/auth/authSlice";
import { baltraSearchProducts } from "../../../redux/features/product/productSlice";
const UserProductHeader = () => {
  const { isAuthenticated, customer } = useSelector((state) => state.auth);

  const authToken = localStorage.getItem("AuthID");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isShownDropDown, setIsShownDropDown] = useState(false);
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
    enqueueSnackbar("Logout SuccessFully", {
      variant: "success",
    });
    navigate("/baltra-allProducts");
  };

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
      <div className="font-gothamNarrow text-white relative w-full h-16 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        {/* Logo */}
        <NavLink to="/baltra-aboutUs-Page">
          <img className="h-8 sm:h-8 md:h-10" src={userHeaderImg} alt="Logo" />
        </NavLink>

        {/* HiMiniBars3 Icon for Small Screens */}
        <button className="md:hidden" onClick={handleShowMenu}>
          <HiMiniBars3 className="text-white w-6 h-6" />
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 ml-4 lg:ml-8 font-gothamNarrow">
          <NavLink
            to="/baltra-aboutUs-Page"
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-medium"
                : "text-white hover:text-[#ffffff] hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">About Us</span>
          </NavLink>
          <NavLink
            to="/baltra-allProducts"
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-medium"
                : "text-white hover:text-[#ffffff] hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">Our Products</span>
          </NavLink>
          <NavLink
            to="/baltra-catalog"
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-medium"
                : "text-white hover:text-[#ffffff] hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">E-Catalogue</span>
          </NavLink>
          <NavLink
            to="/baltra-trackingProducts"
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-medium"
                : "text-white hover:text-[#ffffff] hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">Service and Support</span>
          </NavLink>
          <NavLink
            to="/baltra-contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-white underline font-medium"
                : "text-white hover:text-[#ffffff] hover:underline"
            }
            style={{ textUnderlineOffset: "6px" }}
          >
            <span className="text-sm">Contact Us</span>
          </NavLink>
        </div>

        {/* Search and Login */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <div className="w-32 sm:w-40 lg:w-56 h-8 sm:h-10 p-2 bg-[rgba(255,255,255,0.09)] rounded-[35px] border border-[#ffffff] flex justify-start items-center relative">
            <HiSearch className="absolute left-2 text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            <input
              type="text"
              placeholder="Search"
              value={product_name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none text-white text-xs sm:text-sm lg:text-base font-gothamNarrow font-normal placeholder-[#928686] focus:outline-none pl-8 sm:pl-10"
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
                  <span className="text-sm text-white font-gothamNarrow">
                    {customer?.firstname}
                  </span>
                </button>
                {isShownDropDown && (
                  <div className="absolute right-0 top-full mt-4 w-48 bg-white shadow-sm rounded-sm z-50">
                    <ul className="py-2 tracking-wider font-gothamNarrow">
                      <li className="flex items-center px-4 py-2 text-gray-500 text-sm">
                        <NavLink
                          to="/baltra-profileInformation"
                          onClick={handleDropdownClose}
                          className="text-gray-800 hover:text-red-600 hover:border-red-700 transition duration-300 font-gothamNarrow"
                        >
                          <HiOutlineUserCircle className="inline-block mr-2" />{" "}
                          My Account
                        </NavLink>
                      </li>
                      <li className="flex items-center px-4 py-2 text-gray-500 text-sm">
                        <NavLink
                          to="/baltra-user-ProductPage"
                          onClick={handleDropdownClose}
                          className="text-gray-800 hover:text-red-600 hover:border-red-700 transition duration-300 font-gothamNarrow"
                        >
                          <AiOutlineProduct className="inline-block mr-2" /> My
                          Products
                        </NavLink>
                      </li>
                      <li className="flex items-center px-4 py-2 text-gray-500 text-sm">
                        <NavLink
                          to="/baltra-reward-point"
                          onClick={handleDropdownClose}
                          className="text-gray-800 hover:text-red-600 hover:border-red-700 transition duration-300 font-gothamNarrow"
                        >
                          <CiTrophy className="inline-block mr-2" /> Reward
                          Points
                        </NavLink>
                      </li>
                      <li className="flex items-center px-4 py-2 text-gray-500 text-sm">
                        <NavLink
                          to="/baltra-trackingProducts"
                          onClick={handleDropdownClose}
                          className="text-gray-800 hover:text-red-600 hover:border-red-700 transition duration-300 font-gothamNarrow"
                        >
                          <MdOutlineMedicalServices className="inline-block mr-2" />{" "}
                          Service Ticket
                        </NavLink>
                      </li>
                      <li className="flex items-center px-4 py-2 text-gray-500 text-sm">
                        <NavLink
                          to="/baltra-bulk-quote"
                          onClick={handleDropdownClose}
                          className="text-gray-800 hover:text-red-600 hover:border-red-700 transition duration-300 font-gothamNarrow"
                        >
                          <GoStack className="inline-block mr-2" />
                          Bulk Order History
                        </NavLink>
                      </li>

                      {customer && customer.role === "admin" && (
                        <li className="flex items-center px-4 py-2 text-gray-500 text-sm mb-2">
                          <NavLink
                            to="/baltra-admin-dashboard"
                            className="text-gray-800 hover:text-red-600 hover:border-red-700 transition duration-300 font-gothamNarrow"
                          >
                            <MdOutlineDashboardCustomize className="inline-block mr-2" />{" "}
                            Dashboard
                          </NavLink>
                        </li>
                      )}
                      <li className="px-4 py-2 mb-2">
                        <button
                          onClick={handleLogout}
                          className="text-gray-800 hover:text-red-600 hover:border-[#000000] transition duration-300 font-gothamNarrow"
                        >
                          <GoSignOut className="inline-block mr-2" /> Logout
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
    </>
  );
};

export default UserProductHeader;
