import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductHeader from "../../components/topHeader/productHeader/ProductHeader";
import MetaData from "../../components/layout/metaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import PdfModal from "./pdfModal/PdfModal";
import {
  allProductsCatalog,
  clearProductError,
} from "../../redux/features/product/productSlice";
import CatalogSkeleton from "./CatalogSkeleton";

// Reusable RippleButton Component
const RippleButton = ({ label, rippleColor, onClick }) => {
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="w-full py-3 sm:py-3 border border-[#202D31] flex justify-center items-center relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Ripple Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute rounded-full"
            style={{
              top: ripplePosition.y,
              left: ripplePosition.x,
              width: 0,
              height: 0,
              transform: "translate(-50%, -50%)",
              backgroundColor: rippleColor,
            }}
            animate={{
              width: 700,
              height: 700,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5 },
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Button Text */}
      <span
        className={`relative z-10 text-center text-sm sm:text-base lg:text-lg font-semibold font-gothamNarrow ${
          isHovered ? "text-white" : "text-black"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
};

const BaltraCatalog = () => {
  const { loading, error, allProductsCatalogList } = useSelector(
    (state) => state.product
  );
  const { isAuthenticated, customer } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(allProductsCatalog());
  }, [dispatch]);

  const handleExplore = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  // Function to handle download

  const handleDownload = async (pdfUrl) => {
    try {
      setIsLoading(true);

      const response = await fetch(pdfUrl);
      const arrayBuffer = await response.arrayBuffer();

      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "catalog.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      console.log("PDF downloaded successfully");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MetaData title="baltra-products-catalog" />
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 my-24 md:my-28 lg:my-32 h-full">
        <div className="absolute top-0 left-0 w-full z-10">
          <ProductHeader
            isAuthenticated={isAuthenticated}
            customer={customer}
          />
        </div>

        {loading ? (
          <CatalogSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProductsCatalogList && allProductsCatalogList.length > 0 ? (
              allProductsCatalogList?.map((catalog) => (
                <div
                  key={catalog.id}
                  className="flex flex-col justify-start items-center gap-4"
                >
                  {/* Image for the catalog */}
                  <img
                    src={catalog.catalogue_image}
                    onClick={openModal}
                    className="h-[350px] shadow-lg shadow-gray-400 p-2 cursor-pointer"
                    alt={catalog.catalogue_type}
                  />
                  {/* PDF Modal */}
                  <PdfModal isOpen={isModalOpen} onClose={closeModal} />

                  {/* Catalog Title */}
                  <div className="text-center text-[#101214] text-base sm:text-lg md:text-xl font-gothamNarrow">
                    {catalog.catalogue_type}
                  </div>

                  {/* Explore and Download Buttons */}
                  <div className="flex flex-col justify-start items-center gap-3 w-full">
                    <RippleButton
                      label="EXPLORE"
                      rippleColor="#071C2E"
                      onClick={() => handleExplore(catalog.file)}
                    />
                    <RippleButton
                      label="DOWNLOAD"
                      rippleColor="#071C2E"
                      onClick={() => handleDownload(catalog.file)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))
            ) : (
              <span>No Data Found</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BaltraCatalog;
