import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { AiOutlineRight } from "react-icons/ai";
import "./SideBarLayout.css";

const SideBarLayout = ({ showSidebar, setShowSidebar }) => {
  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <>
      <div
        className={`font-gothamNarrow fixed top-0 left-0 w-full md:w-2/6 h-full bg-white transform transition-transform duration-300 ${
          showSidebar ? "slide-in" : "slide-out"
        } ease-in-out z-50`}
      >
        <div className="flex justify-end p-4 my-5">
          <button
            onClick={handleCloseSidebar}
            className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center"
          >
            <span className="font-gothamNarrow text-xl md:text-2xl text-[#000000] mr-1 tracking-wider">
              MENU
            </span>{" "}
            <HiOutlineXMark size={30} />
          </button>
        </div>
        <ul className="font-gothamNarrow font-normal mt-14 md:mt-0 px-4 md:px-14 ">
          <li className="mb-8 flex justify-between items-center border-b border-black">
            <div className="flex items-center">
              <NavLink
                to="/baltra-aboutUs-Page"
                className="font-gothamNarrow text-[#000000] hover:text-red-600 transition duration-300 tracking-normal text-base md:text-lg"
                onClick={handleCloseSidebar}
              >
                <span>AboutUs</span>
              </NavLink>
            </div>
            <AiOutlineRight size={14} className="ml-28" />
          </li>
          <li className="mb-8 flex justify-between items-center border-b border-black">
            <div className="flex items-center">
              <NavLink
                to="/baltra-allProducts"
                className="font-gothamNarrow text-[#000000] hover:text-red-600 transition duration-300 tracking-normal text-base md:text-lg"
                onClick={handleCloseSidebar}
              >
                <span>Our Products</span>
              </NavLink>
            </div>
            <AiOutlineRight size={14} className="ml-28" />
          </li>
          <li className="mb-8 flex justify-between items-center border-b border-black">
            <div className="flex items-center">
              <NavLink
                to="/baltra-catalog"
                className="font-gothamNarrow text-[#000000] hover:text-red-600 transition duration-300 tracking-normal text-base md:text-lg"
                onClick={handleCloseSidebar}
              >
                <span>E-Catalogue</span>
              </NavLink>
            </div>
            <AiOutlineRight size={14} className="ml-28" />
          </li>
          <li className="mb-8 flex justify-between items-center border-b border-black">
            <div className="flex items-center">
              <NavLink
                to="/baltra-trackingProducts"
                className="font-gothamNarrow text-[#000000] hover:text-red-600 transition duration-300 tracking-normal text-base md:text-lg"
                onClick={handleCloseSidebar}
              >
                <span>Service and Support </span>
              </NavLink>
            </div>
            <AiOutlineRight size={14} className="ml-28" />
          </li>
          <li className="mb-8 flex justify-between items-center border-b border-black">
            <div className="flex items-center">
              <NavLink
                to="/baltra-contact-us"
                className="font-gothamNarrow text-[#000000] hover:text-red-600 transition duration-300 tracking-normal text-base md:text-lg"
                onClick={handleCloseSidebar}
              >
                <span>Contact Us</span>
              </NavLink>
            </div>
            <AiOutlineRight size={14} className="ml-28" />
          </li>
        </ul>
      </div>
    </>
  );
};

SideBarLayout.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
};

export default SideBarLayout;
