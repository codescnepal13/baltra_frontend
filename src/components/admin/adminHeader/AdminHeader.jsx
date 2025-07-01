import React, { useState } from "react";
import {
  FaAngleDown,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
// import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setLogout } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const AdminHeader = ({ collapsed, toggleCollapsed }) => {
  const { customer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const newTimer = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
    setTimer(newTimer);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    toast.success("Logout successfully!");
    navigate("/baltra-aboutUs-Page");
  };

  return (
    <>
      <header
        id="header"
        className="sticky top-0 w-full bg-white p-4 border-b-4 border-gray-100"
      >
        <div className="flex items-center justify-between font-gothamNarrow">
          {/* Left Section: Visit Site and Links */}
          <div className="flex items-center space-x-4 px-4">
            <Link
              to="https://baltra.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-md flex items-center font-gothamNarrow"
            >
              Visit Site <FaExternalLinkAlt className="ml-1" />
            </Link>

            <Link
              to={"#"}
              className="text-gray-900 hover:text-blue-600 font-gothamNarrow tracking-tight text-sm"
            >
              Docs
            </Link>
            <Link
              to={"#"}
              className="text-gray-900 hover:text-blue-600 font-gothamNarrow tracking-tight text-sm"
            >
              Blog
            </Link>
            <Link
              to={"#"}
              className="text-gray-900 hover:text-blue-600 font-gothamNarrow tracking-tight text-sm"
            >
              Forum
            </Link>
          </div>

          {/* Right Section: Notifications and User Dropdown */}
          <div
            className="relative group flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* <div className="relative mr-4">
              <IoNotificationsOutline className="text-gray-500" size={24} />
              <span
                className="absolute top-[-4px] right-0 inline-flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full"
                style={{ width: "15px", height: "15px" }}
              >
                2
              </span>
            </div> */}
            <div className="user cursor-pointer flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                {customer?.image_url ? (
                  <img
                    src={customer?.image_url}
                    alt="avatar Img"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <HiOutlineUserCircle className="text-gray-500" size={30} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[#000000] font-gothamNarrow">
                  {customer?.firstname} {customer?.lastname}
                </span>
                <p className="text-xs font-gothamNarrow">{customer?.email}</p>
              </div>
              <FaAngleDown className="text-gray-500 ml-2" />
            </div>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50"
                role="menu"
                aria-orientation="vertical"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="py-2" role="none">
                  <li
                    className="cursor-pointer px-4 py-2 flex items-center"
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Link
                      to="/baltra-admin-dashboard/admin-profile-information"
                      className="flex items-center"
                    >
                      <FaUser className="mr-2" aria-hidden="true" />
                      <span className="text-gray-500 hover:text-red-700 font-gothamNarrow">
                        Profile
                      </span>
                    </Link>
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 flex items-center"
                    role="menuitem"
                    tabIndex={0}
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" aria-hidden="true" />
                      <span className="text-gray-500 hover:text-red-700 font-gothamNarrow">
                        Logout
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className="content p-2 overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AdminHeader;
