import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import FooterImg from "../../assets/images/BALTRALOGO.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#000C13] relative w-full h-auto py-10 px-6 md:px-12 lg:px-24 xl:px-32 mt-0">
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Column 1 */}
          <div className="flex flex-col font-gothamNarrow w-full sm:w-1/2 md:w-1/3 lg:w-auto">
            <h2 className="text-white text-lg font-medium mb-6">Who we are</h2>
            <Link
              to="/baltra-aboutUs-Page"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              About Us
            </Link>
            <Link
              to="/baltra-contact-us"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Contact us
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col font-gothamNarrow w-full sm:w-1/2 md:w-1/3 lg:w-auto">
            <h2 className="text-white text-lg font-medium mb-6">Products</h2>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Kitchen Essentials
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Winter Essentials
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Summer Essentials
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Pressure cooker and cookware
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Personal Care
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Bottle and flasks
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Home Solutions
            </Link>
            <Link to="" className="text-gray-400 text-sm hover:text-white mb-2">
              3D Product Models
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col font-gothamNarrow w-full sm:w-1/2 md:w-1/3 lg:w-auto">
            <h2 className="text-white text-lg font-medium mb-6">
              Appliance Care
            </h2>
            <Link
              to="/baltra-user-ProductPage"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Register a Complaint
            </Link>
            <Link
              to="/baltra-trackingProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Track your Products
            </Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col font-gothamNarrow w-full sm:w-1/2 md:w-1/3 lg:w-auto">
            <h2 className="text-white text-lg font-medium mb-6">Best Seller</h2>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Air Fryer
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Heater
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Air Cooler
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Bottle
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Pressure cooker
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Water Dispenser
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Induction
            </Link>
            <Link
              to="/baltra-allProducts"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Kettle
            </Link>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col font-gothamNarrow w-full sm:w-1/2 md:w-1/3 lg:w-auto">
            <h2 className="text-white text-lg font-medium mb-6">E-Catalog</h2>
            <Link
              to="/baltra-catalog"
              className="text-gray-400 text-sm hover:text-white mb-2"
            >
              Download Catalogues
            </Link>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col font-gothamNarrow w-full sm:w-1/2 md:w-1/3 lg:w-auto">
            <h2 className="text-white text-lg font-medium mb-6">
              {" "}
              Get in Touch
            </h2>
            <div className="flex items-center text-gray-400 text-sm hover:text-white mb-2">
              <AiOutlineMail className="mr-2" />
              <Link to="/baltra-contact-us" className="hover:text-white">
                info@balajeenp.com
              </Link>
            </div>
            <div className="flex items-center text-gray-400 text-sm hover:text-white mb-2">
              <AiOutlinePhone className="mr-2" />
              <Link to="/baltra-contact-us" className="hover:text-white">
                +977-15970088
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="text-white">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between lg:items-center font-gothamNarrow space-y-4 lg:space-y-0">
            {/* Left Section: Copyright */}
            <div className="text-sm">&copy; {currentYear} Baltra&reg;</div>

            <Link to="/">
              <img
                className="w-42 h-auto lg:w-full lg:h-auto sm:w-32 sm:h-16"
                src={FooterImg}
                alt="Footer Image"
              />
            </Link>

            {/* Right Section: Social Icons */}
            <div className="flex space-x-4">
              <a href="https://www.instagram.com" target="__blank">
                <FaInstagram
                  className="text-white hover:text-gray-100"
                  size={24}
                />
              </a>
              <a href="https://www.facebook.com" target="__blank">
                <FaFacebook
                  className="text-white hover:text-gray-100"
                  size={24}
                />
              </a>
              <a href="https://www.youtube.com" target="__blank">
                <FaYoutube
                  className="text-white hover:text-gray-100"
                  size={24}
                />
              </a>
              <a href="https://www.linkedin.com" target="__blank">
                <FaLinkedin
                  className="text-white hover:text-gray-100"
                  size={24}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
