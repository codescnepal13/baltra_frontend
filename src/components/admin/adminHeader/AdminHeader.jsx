import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import {
  FaAngleDown,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setLogout } from "../../../redux/features/auth/authSlice";

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
    const newTimer = setTimeout(() => setDropdownOpen(false), 200);
    setTimer(newTimer);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/baltra-aboutUs-Page");
  };

  const fullName = [customer?.firstname, customer?.lastname]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header
        id="header"
        className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 font-gothamNarrow">
          {/* ── Left ── */}
          <div className="flex items-center gap-3">
            <Link
              to="https://np.baltra.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-150"
            >
              Visit Site
              <FaExternalLinkAlt className="text-[10px]" />
            </Link>

            <a
              href="/baltra-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-150"
            >
              Docs
            </a>
          </div>

          {/* ── Right: user dropdown ── */}
          <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                {customer?.image_url ? (
                  <img
                    src={customer.image_url}
                    alt={fullName || "Admin avatar"}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <HiOutlineUserCircle className="text-gray-400 w-6 h-6" />
                )}
              </div>

              {/* Name + email — hidden on xs */}
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-gray-800 text-sm font-medium truncate max-w-[140px]">
                  {fullName || "Admin"}
                </span>
                <span className="text-gray-400 text-xs truncate max-w-[140px]">
                  {customer?.email}
                </span>
              </div>

              <FaAngleDown
                className={`text-gray-400 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div
                className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                role="menu"
                aria-orientation="vertical"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* User info pill — visible on xs only */}
                <div className="sm:hidden px-4 py-2.5 border-b border-gray-100">
                  <p className="text-gray-800 text-sm font-medium truncate">
                    {fullName || "Admin"}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {customer?.email}
                  </p>
                </div>

                <ul className="py-1" role="none">
                  <li role="menuitem">
                    <Link
                      to="/baltra-admin-dashboard/admin-profile-information"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      <FaUser
                        className="text-xs flex-shrink-0"
                        aria-hidden="true"
                      />
                      Profile
                    </Link>
                  </li>
                  <li role="menuitem">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                    >
                      <FaSignOutAlt
                        className="text-xs flex-shrink-0"
                        aria-hidden="true"
                      />
                      Logout
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
