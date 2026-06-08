import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import {
  FaAngleDown,
  FaChevronRight,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../../redux/features/auth/authSlice";
import LogoutPopUp from "../../layout/logoutPopUp/LogoutPopUp";

// Maps role keys → human-readable label + color classes
const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  product_incharge: {
    label: "Product Incharge",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  service_incharge: {
    label: "Service Incharge",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  customer: {
    label: "Customer",
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
};

const RoleBadge = ({ role, size = "sm" }) => {
  const cfg = ROLE_CONFIG[role] ?? {
    label: role ?? "Unknown",
    bg: "bg-slate-50",
    text: "text-slate-500",
    border: "border-slate-200",
    dot: "bg-slate-400",
  };

  if (size === "xs") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-semibold tracking-wide ${cfg.bg} ${cfg.text} ${cfg.border}`}
      >
        <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
        {cfg.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-semibold tracking-wide ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const AdminHeader = ({ collapsed, toggleCollapsed }) => {
  const { customer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const t = setTimeout(() => setDropdownOpen(false), 200);
    setTimer(t);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    enqueueSnackbar("Logged out successfully", { variant: "success" });
    navigate("/baltra-aboutUs-Page");
  };

  const openLogoutModal = () => {
    setDropdownOpen(false);
    setShowLogoutModal(true);
  };
  const closeLogoutModal = () => setShowLogoutModal(false);

  const fullName = [customer?.firstname, customer?.lastname]
    .filter(Boolean)
    .join(" ");
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "A";

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

          {/* ── Right: user dropdown trigger ── */}
          <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
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

              {/* Name + role badge */}
              <div className="hidden sm:flex flex-col text-left leading-tight gap-0.5">
                <span className="text-gray-800 text-sm font-medium truncate max-w-[140px]">
                  {fullName || "Admin"}
                </span>
                {customer?.role && <RoleBadge role={customer.role} size="xs" />}
              </div>

              <FaAngleDown
                className={`text-gray-400 text-xs transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* ── Dropdown ── */}
            {dropdownOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="absolute right-0 top-full mt-2 w-60 bg-white border border-slate-200/80 rounded-2xl overflow-hidden z-50 shadow-lg shadow-slate-100"
              >
                {/* Dropdown header — name, email, role */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                    {customer?.image_url ? (
                      <img
                        src={customer.image_url}
                        alt={fullName}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-[13px] font-semibold text-red-600 leading-none select-none">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-gray-800 truncate leading-tight">
                      {fullName || "Admin"}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5 mb-1.5">
                      {customer?.email}
                    </p>
                    {customer?.role && (
                      <RoleBadge role={customer.role} size="sm" />
                    )}
                  </div>
                </div>

                {/* Menu items */}
                <ul role="none" className="p-1.5 flex flex-col gap-0.5">
                  <li role="menuitem">
                    <Link
                      to="/baltra-admin-dashboard/admin-profile-information"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-slate-50 hover:text-gray-900 transition-colors duration-100 group"
                    >
                      <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <FaUser
                          size={11}
                          className="text-slate-500"
                          aria-hidden="true"
                        />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-700 leading-none">
                          Profile
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          View &amp; edit details
                        </p>
                      </div>
                      <FaChevronRight
                        size={9}
                        className="text-gray-300 flex-shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>

                  <li
                    role="separator"
                    className="h-px bg-slate-100 mx-1 my-0.5"
                  />

                  <li role="menuitem">
                    <button
                      onClick={openLogoutModal}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-100 group"
                    >
                      <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                        <FaSignOutAlt
                          size={11}
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
        </div>
      </header>

      {showLogoutModal && (
        <LogoutPopUp onClose={closeLogoutModal} handleLogout={handleLogout} />
      )}
    </>
  );
};

export default AdminHeader;
