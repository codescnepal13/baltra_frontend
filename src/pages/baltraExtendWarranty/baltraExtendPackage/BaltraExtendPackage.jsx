import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import moment from "moment";
import ExtendedSkeleton from "../extendedSkeleton/ExtendedSkeleton";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Reusable Check Icon Component
const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-teal-500 mr-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 13l4 4L19 7"></path>
  </svg>
);

const BaltraExtendPackage = ({ loyaltyProduct, loading }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    navigate(`/baltra-reward-point/${stock_details.id}`, {
      state: { warranty_details, stock_details },
    });
  };
  if (loading) {
    return <ExtendedSkeleton />;
  }

  if (
    !loyaltyProduct ||
    !loyaltyProduct.stock_details ||
    !loyaltyProduct.warranty_details
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">No Data Found</p>
      </div>
    );
  }

  const { stock_details, warranty_details } = loyaltyProduct;
  const formattedDate = stock_details.purchase_date
    ? moment(stock_details.purchase_date).format("Do MMMM, YYYY")
    : "N/A";

  const formattedExpiry = stock_details.warranty_expiry
    ? moment(stock_details.warranty_expiry).format("Do MMMM, YYYY")
    : "N/A";

  return (
    <>
      <div className="min-h-screen py-10 px-4 lg:px-52">
        <div>
          <span className="text-black text-sm font-gothamNarrow">
            My Products
          </span>
          <span className="text-black text-base font-semibold font-gothamNarrow">
            {" "}
            {">"}{" "}
          </span>
          <span className="text-black text-base font-semibold font-gothamNarrow">
            {stock_details.model_name}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-start items-start gap-x-14">
          <div className="flex flex-col justify-start items-start my-8">
            <div className="text-[#ED1C24] text-3xl font-bold font-gothamNarrow">
              Warranty Offers
            </div>
            <div className="text-center text-[#1A1A1A] text-lg font-light font-gothamNarrow">
              Select the one that suits you best
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start p-2 border border-[#C2C2C2] gap-4">
            <div className="flex-shrink-0">
              <img
                className="w-36 h-36 md:w-[147px] md:h-[144px]"
                src={stock_details.product_image}
                alt="warrantyPackageImg"
              />
            </div>

            <div className="flex flex-col md:ml-2 my-5">
              <div className="text-[#1A1A1A] text-base font-semibold font-gothamNarrow">
                {stock_details.model_name}
              </div>

              <div className="text-black text-sm font-gothamNarrow tracking-[0.14px] pt-2">
                <span className="font-semibold">Serial Number:</span>{" "}
                {stock_details.serial_number}
              </div>
              <div className="text-[#1A1A1A] text-sm font-gothamNarrow pt-2">
                <span className="font-semibold">Model:</span>{" "}
                {stock_details.model_num}
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-3 ml-4 mt-4">
              <div className="text-black text-sm font-gothamNarrow">
                <span className="font-semibold">Store Name:</span>{" "}
                {stock_details.store_name}
              </div>
              <div className="text-black text-sm font-gothamNarrow">
                <span className="font-semibold">Purchase Date:</span>{" "}
                {formattedDate}
              </div>
              <div className="text-black text-sm font-gothamNarrow">
                <span className="font-semibold">Warranty Expiry:</span>{" "}
                {formattedExpiry}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 mt-10">
          <AnimatePresence>
            <motion.div
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{
                boxShadow:
                  "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              animate={isHovered ? { opacity: 10 } : { opacity: 1 }}
            >
              <div className="border-2 rounded-sm p-8 w-full sm:w-80 my-5 border-purple-500">
                <div className="text-gray-500 font-gothamNarrow text-sm my-2">
                  {warranty_details.duration} Months
                </div>
                <div className="text-2xl font-semibold mt-2 font-gothamNarrow">
                  {warranty_details.tier_type}
                </div>
                <div className="text-4xl font-bold mt-2 font-gothamNarrow">
                  Rs. {warranty_details.price}
                </div>

                <div className="mt-10">
                  <div className="font-semibold font-gothamNarrow">
                    Includes
                  </div>
                  <ul className="list-none mt-2 space-y-2">
                    {[
                      "Loyalty Rewards Program",
                      "Free Servicing",
                      "Extended Warranty Offers",
                      "Priority Customer Support",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex text-sm font-gothamNarrow items-center"
                      >
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-16">
                  <button className="w-full text-sm border-2 border-purple-500 text-purple-500 py-3 hover:bg-purple-500 hover:text-white transition-colors duration-300 font-gothamNarrow">
                    EXTEND WARRANTY
                  </button>
                  <button
                    onClick={handleNext}
                    className="font-gothamNarrow text-sm w-full mt-4 py-3 text-white transition-colors duration-300 
                     bg-purple-500 hover:bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    USE LOYALTY POINTS{" "}
                    <FaArrowRight className="inline-block ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default BaltraExtendPackage;
