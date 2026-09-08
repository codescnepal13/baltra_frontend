import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineProduct, AiOutlineRight } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineMedicalServices } from "react-icons/md";
import { NavLink } from "react-router-dom";
import RedBaltraLogoImg from "../../../assets/images/redBaltraLogoImg.png";

const links = [
  { to: "/baltra-aboutUs-Page", label: "About Us" },
  { to: "/baltra-allProducts", label: "Our Products" },
  { to: "/baltra-catalog", label: "E-Catalogue" },
  { to: "/baltra-contact-us", label: "Contact Us" },
];

const linkClass = ({ isActive }) =>
  `flex justify-between items-center py-3.5 px-2 rounded-lg transition-colors duration-200 group ${
    isActive
      ? "text-red-600 bg-red-50"
      : "text-[#000000] hover:bg-gray-50 hover:text-red-600"
  }`;

const TRANSITION_MS = 350;

const SideBarLayout = ({
  showSidebar,
  setShowSidebar,
  isAuthenticated,
  onLogoutClick,
}) => {
  // mounted: whether the panel exists in the DOM at all
  const [mounted, setMounted] = useState(showSidebar);
  // visible: whether the "open" transform/opacity classes are applied
  const [visible, setVisible] = useState(false);

  // Track every pending rAF / timeout so we can fully cancel them,
  // including nested rAFs, on every toggle and on unmount.
  const rafIdsRef = useRef([]);
  const timeoutIdRef = useRef(null);
  const generationRef = useRef(0);

  const clearPendingWork = () => {
    rafIdsRef.current.forEach((id) => cancelAnimationFrame(id));
    rafIdsRef.current = [];
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  useEffect(() => {
    // Bump the generation so any callback scheduled by a previous
    // run of this effect knows it's stale and refuses to apply.
    const myGeneration = ++generationRef.current;

    // Cancel anything left over from the previous toggle before
    // starting a new one — this is what the old code was missing
    // for the *nested* rAF.
    clearPendingWork();

    if (showSidebar) {
      setMounted(true);
      // Double rAF: mount with "closed" classes first, then flip to
      // "open" on the next frame so the browser actually animates.
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          if (generationRef.current === myGeneration) {
            setVisible(true);
          }
        });
        rafIdsRef.current.push(raf2);
      });
      rafIdsRef.current.push(raf1);
    } else {
      setVisible(false);
      timeoutIdRef.current = setTimeout(() => {
        if (generationRef.current === myGeneration) {
          setMounted(false);
        }
      }, TRANSITION_MS);
    }

    return clearPendingWork;
  }, [showSidebar]);

  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSidebar]);

  const handleCloseSidebar = () => setShowSidebar(false);

  if (!mounted) return null;

  const sidebarContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={handleCloseSidebar}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9998] transition-opacity duration-300 ease-out ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Panel */}
      <div
        className={`font-gothamNarrow fixed top-0 left-0 w-full md:w-2/6 h-full bg-white z-[9999] shadow-2xl transform transition-transform duration-[350ms] ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        <div className="flex justify-between items-center p-4 my-5">
          <img
            src={RedBaltraLogoImg}
            alt="Red Baltra Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />

          <button
            onClick={handleCloseSidebar}
            className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center"
            aria-label="Close menu"
          >
            <span className="font-gothamNarrow text-xl md:text-2xl text-[#000000] mr-1 tracking-wider">
              MENU
            </span>
            <HiOutlineXMark size={30} />
          </button>
        </div>

        <ul className="font-gothamNarrow font-normal mt-6 md:mt-0 px-4 md:px-14 flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={handleCloseSidebar}
                className={linkClass}
              >
                <span className="text-base md:text-lg tracking-normal">
                  {link.label}
                </span>
                <AiOutlineRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                />
              </NavLink>
            </li>
          ))}

          {isAuthenticated && (
            <>
              <li className="my-2 h-px bg-gray-200" />
              <li>
                <NavLink
                  to="/baltra-user-ProductPage"
                  onClick={handleCloseSidebar}
                  className={linkClass}
                >
                  <span className="flex items-center gap-2.5 text-base md:text-lg tracking-normal">
                    <AiOutlineProduct size={18} />
                    My Products
                  </span>
                  <AiOutlineRight
                    size={14}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/baltra-trackingProducts"
                  onClick={handleCloseSidebar}
                  className={linkClass}
                >
                  <span className="flex items-center gap-2.5 text-base md:text-lg tracking-normal">
                    <MdOutlineMedicalServices size={18} />
                    Service Ticket
                  </span>
                  <AiOutlineRight
                    size={14}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </NavLink>
              </li>
              <li className="my-2 h-px bg-gray-200" />
              <li>
                <button
                  onClick={() => {
                    handleCloseSidebar();
                    onLogoutClick?.();
                  }}
                  className="w-full flex items-center gap-2.5 py-3.5 px-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  <GoSignOut size={18} />
                  <span className="text-base md:text-lg tracking-normal">
                    Log out
                  </span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );

  return createPortal(sidebarContent, document.body);
};

SideBarLayout.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  onLogoutClick: PropTypes.func,
};

export default SideBarLayout;
