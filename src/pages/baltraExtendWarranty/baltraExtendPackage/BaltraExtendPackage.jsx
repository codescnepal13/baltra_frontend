import { motion } from "framer-motion";
import moment from "moment";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ExtendedSkeleton from "../extendedSkeleton/ExtendedSkeleton";

// Reusable Check Icon
const CheckIcon = () => (
  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-red-50 flex items-center justify-center mr-2.5">
    <FaCheck className="w-2 h-2 text-[#ED1C24]" />
  </span>
);

const BaltraExtendPackage = ({ loyaltyProduct, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <ExtendedSkeleton />;
  }

  if (
    !loyaltyProduct ||
    !loyaltyProduct.stock_details ||
    !loyaltyProduct.warranty_details
  ) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-base sm:text-lg text-gray-500 font-gothamNarrow text-center">
          No Data Found
        </p>
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

  const handleNext = () => {
    navigate(`/baltra-reward-point/${stock_details.id}`, {
      state: { warranty_details, stock_details },
    });
  };

  const includes = [
    "Loyalty Rewards Program",
    "Free Servicing",
    "Extended Warranty Offers",
    "Priority Customer Support",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 flex-wrap mb-6 sm:mb-8">
        <span className="text-black text-xs sm:text-sm font-gothamNarrow">
          My Products
        </span>
        <span className="text-black text-sm sm:text-base font-semibold font-gothamNarrow">
          {">"}
        </span>
        <span className="text-black text-sm sm:text-base font-semibold font-gothamNarrow truncate max-w-[220px] sm:max-w-none">
          {stock_details.model_name}
        </span>
      </div>

      {/* Heading */}
      <div className="flex flex-col justify-start items-start mb-6 sm:mb-8">
        <h1 className="text-[#ED1C24] text-2xl sm:text-3xl font-bold font-gothamNarrow">
          Warranty Offers
        </h1>
        <p className="text-[#1A1A1A] text-base sm:text-lg font-light font-gothamNarrow mt-1">
          Select the one that suits you best
        </p>
      </div>

      {/* Product summary card */}
      <div className="w-full border border-[#E5E5E5] rounded-lg p-4 sm:p-5 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
          <img
            className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain flex-shrink-0 mx-auto sm:mx-0"
            src={stock_details.product_image}
            alt={stock_details.model_name || "product"}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 flex-1 text-center sm:text-left">
            <div>
              <div className="text-[#1A1A1A] text-base font-semibold font-gothamNarrow mb-1">
                {stock_details.model_name}
              </div>
              <div className="text-black text-sm font-gothamNarrow tracking-[0.14px]">
                <span className="font-semibold">Serial Number:</span>{" "}
                {stock_details.serial_number}
              </div>
              <div className="text-[#1A1A1A] text-sm font-gothamNarrow mt-1.5">
                <span className="font-semibold">Model:</span>{" "}
                {stock_details.model_num}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:justify-center">
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
      </div>

      {/* Warranty pricing card */}
      <div className="flex justify-center">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full sm:w-[340px] rounded-xl border-2 border-[#ED1C24]/20 hover:border-[#ED1C24]/60 hover:shadow-[0_8px_30px_rgba(237,28,36,0.12)] transition-all duration-300 p-6 sm:p-8 flex flex-col"
        >
          <div className="text-gray-500 font-gothamNarrow text-sm">
            {warranty_details.duration} Months
          </div>
          <div className="text-xl sm:text-2xl font-semibold mt-1.5 font-gothamNarrow">
            {warranty_details.tier_type}
          </div>
          <div className="text-3xl sm:text-4xl font-bold mt-2 font-gothamNarrow">
            Rs. {warranty_details.price}
          </div>

          <div className="mt-8">
            <div className="font-semibold font-gothamNarrow text-sm sm:text-base">
              Includes
            </div>
            <ul className="list-none mt-3 space-y-2.5">
              {includes.map((item, index) => (
                <li
                  key={index}
                  className="flex text-sm font-gothamNarrow items-center text-[#1A1A1A]"
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <button className="w-full text-sm border-2 border-[#ED1C24] text-[#ED1C24] py-3 rounded-md hover:bg-[#ED1C24] hover:text-white transition-colors duration-300 font-gothamNarrow font-medium">
              EXTEND WARRANTY
            </button>
            <button
              onClick={handleNext}
              className="font-gothamNarrow text-sm w-full py-3 rounded-md text-white transition-all duration-300 font-medium bg-[#ED1C24] hover:bg-gradient-to-r hover:from-[#ED1C24] hover:to-[#831010] flex items-center justify-center gap-2"
            >
              USE LOYALTY POINTS
              <FaArrowRight className="inline-block" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BaltraExtendPackage;
