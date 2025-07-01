import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import {
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductViewSkeleton from "../../../components/layout/productViewSkeleton/ProductViewSkeleton";
import { baltraProductsRelated } from "../../../redux/features/product/productSlice";
import BaltraPersonalization from "../../baltraPersonalization/BaltraPersonalization";
import BaltraQuoteModal from "../../baltraQuoteModal/BaltraQuoteModal";
import RelatedProducts from "../relatedProducts/RelatedProducts";
import "./ProductViewDetails.css";
import ProductDescription from "./productDescription/ProductDescription";
import ProductDetailsVideo from "./productDetailsVideo/ProductDetailsVideo";
import ProductVaccum from "./productVaccum/ProductVaccum";
import RatingReviewsSection from "./ratingReviewsSection/RatingReviewsSection";
import StarRating from "./ratingReviewsSection/starRating/StarRating";

const RippleButton = ({ label, rippleColor, onClick, children }) => {
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
              width: 1500,
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

      {/* Button Text and Children */}
      <span
        className={`relative z-10 text-center text-sm sm:text-base lg:text-lg font-semibold font-gothamNarrow flex items-center ${
          isHovered ? "text-white" : "text-black"
        }`}
      >
        {label}
        {children && <span className="ml-2">{children}</span>}
      </span>
    </motion.button>
  );
};

const ProductViewDetails = ({ singleProduct, loading }) => {
  const { isFetching, allRelatedProducts, statRatingReview } = useSelector(
    (state) => state.product
  );
  const { isAuthenticated, customer } = useSelector((state) => state.auth);

  const { average_rating = 0, total_reviews = 0 } = statRatingReview || {};

  const { id } = singleProduct || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedModalName, setSelectedModalName] = useState("");
  const [selectedModalNumber, setSelectedModalNumber] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const [zoomPosition, setZoomPosition] = useState({
    backgroundPositionX: "0%",
    backgroundPositionY: "0%",
  });
  const [isZoomVisible, setIsZoomVisible] = useState(false);

  const handleMouseMove = (event) => {
    const { offsetX, offsetY, target } = event.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPercent = (offsetX / offsetWidth) * 100;
    const yPercent = (offsetY / offsetHeight) * 100;

    setZoomPosition({
      backgroundPositionX: `${xPercent}%`,
      backgroundPositionY: `${yPercent}%`,
    });
    setIsZoomVisible(true);
  };

  const handleMouseOut = () => {
    setIsZoomVisible(false);
  };

  const handlePersonalizationClick = () => {
    if (singleProduct?.category?.category_name === "Bottles & Flasks") {
      if (singleProduct?.sizes?.length > 0 && !selectedSize) {
        toast.warn("Please select a size.");
      } else if (singleProduct?.color_styles?.length > 0 && !selectedColor) {
        toast.warn("Please select a color.");
      } else {
        setIsModalOpen(true);
      }
    } else {
      toast.info("Personalization is only available for Bottles and Flasks.");
    }
  };

  const handleBulkQuoteClick = () => {
    if (isAuthenticated) {
      setQuoteModalOpen(true);
    } else {
      toast.info("please login first!");
    }
  };

  useEffect(() => {
    setSelectedImage(singleProduct?.main_image);
    setSelectedModalName(singleProduct?.model_name);
    setSelectedModalNumber(singleProduct?.model_num);
  }, [singleProduct]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const QuoteCloseModal = () => {
    setQuoteModalOpen(false);
  };

  const handleMouseLeave = () => {
    setSelectedImage(singleProduct?.main_image);
  };

  const handleTogglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    if (id) {
      dispatch(baltraProductsRelated(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <ProductViewSkeleton />
      ) : (
        <div className="px-4 md:px-12 lg:px-24 my-8">
          <div className="text-sm text-gray-500 mb-4">
            <Link
              to={`/category/${singleProduct?.category?.id}`}
              className="hover:underline font-gothamNarrow"
            >
              {singleProduct?.category?.category_name}
            </Link>
            {" / "}
            <Link
              to={`/subcategory/${singleProduct?.sub_category?.id}`}
              className="hover:underline font-gothamNarrow"
            >
              {singleProduct?.sub_category?.sub_category_name}
            </Link>
            {" / "}
            <span className=" font-gothamNarrow">{singleProduct?.name}</span>
          </div>
          <div className="bg-[#ffffff] px-8 py-8 flex flex-col md:flex-row gap-y-8 md:gap-x-12 lg:gap-x-32 overflow-hidden">
            <div className="flex flex-col items-center">
              {/* Main Image */}
              <div className="relative mb-8 flex flex-col items-center">
                <img
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain"
                  src={selectedImage}
                  alt="singleProductImg"
                  loading="lazy"
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                />

                {isZoomVisible && (
                  <div
                    className="absolute inset-0 w-full h-full bg-contain bg-no-repeat pointer-events-none cursor-pointer"
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundPositionX: zoomPosition.backgroundPositionX,
                      backgroundPositionY: zoomPosition.backgroundPositionY,
                      backgroundSize: "200%",
                    }}
                  ></div>
                )}

                {/* Warranty Icon */}
                <img
                  className="absolute top-0 right-[-24px] sm:right-[-40px] md:right-[-74px] lg:right-[-150px] w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"
                  src={singleProduct?.warranty_icon}
                  alt="WarrantyImg"
                />
              </div>

              {/* Variant Images */}
              {singleProduct?.images?.length > 0 && (
                <div className="my-2">
                  <div className="flex gap-2 md:gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
                    {singleProduct.images.map((image, index) => (
                      <img
                        key={index}
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain border border-gray-200 flex-shrink-0 cursor-pointer"
                        src={image.image_url}
                        alt={`Variant ${index + 1}`}
                        onMouseEnter={() => setSelectedImage(image.image_url)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Right side - Content Section */}
            <div className="flex flex-col gap-2 ml-0 md:ml-8 md:w-1/2 lg:w-7/12">
              <div className="text-right">
                <i className="icon-share"></i>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="text-[#77777E] text-base font-gothamNarrow">
                    {singleProduct?.model_name}
                  </div>
                  <div className="flex items-center">
                    <Link to="#" onClick={(e) => e.preventDefault()}>
                      <CiShare2 size={22} onClick={handleTogglePopup} />
                    </Link>
                  </div>
                  {isPopupVisible && (
                    <div className="font-gothamNarrow fixed inset-0 flex items-center px-8 sm:px-0 lg:justify-center z-50">
                      <div className="absolute inset-0 bg-black opacity-50"></div>
                      <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg z-10 max-w-xs sm:max-w-md w-full overflow-hidden">
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                          onClick={handleTogglePopup}
                        >
                          <FaTimes size={24} />
                        </button>
                        <div className="flex flex-col items-center">
                          <h2 className="text-xl font-normal mb-4 font-gothamNarrow">
                            Share via:
                          </h2>
                          <div className="flex flex-wrap justify-center space-x-4">
                            <a
                              href="https://www.facebook.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaFacebook size={32} className="text-blue-600" />
                            </a>
                            <a
                              href="https://www.instagram.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaInstagram
                                size={32}
                                className="text-pink-500"
                              />
                            </a>
                            <a
                              href="https://www.twitter.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaTwitter size={32} className="text-blue-400" />
                            </a>
                            <a
                              href="https://www.youtube.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaYoutube size={32} className="text-red-600" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl text-[#202D31] font-bold font-gothamNarrow my-1">
                  {singleProduct?.name}
                </h2>

                <h2 className="text-sm md:text-base font-semibold text-[#202D31] font-gothamNarrow my-1">
                  {singleProduct?.model_num}
                </h2>
                <p className="text-[#000000] text-base md:text-lg font-gothamNarrow">
                  {singleProduct?.sub_heading}
                </p>
              </div>
              <div className="text-[#ED1C24] text-xl md:text-2xl font-medium tracking-normal">
                MRP. {singleProduct?.price}
              </div>
              <div className="flex items-center gap-1 font-/* The `gothamNarrow` is a custom font class gothamNarrow">
                <StarRating rating={average_rating} />
                <span className="text-gray-500 text-sm font-gothamNarrow">
                  ({total_reviews.toLocaleString()})
                </span>
              </div>
              <hr className="border-t w-full border-gray-300" />
              {singleProduct?.color_styles?.length > 0 && (
                <div>
                  <div className="text-[#4D5159] text-sm font-gothamNarrow">
                    Color
                  </div>
                  <div className="my-2">
                    {singleProduct?.color_styles &&
                      singleProduct?.color_styles?.length > 0 && (
                        <div className="flex items-center flex-wrap justify-start my-2 gap-4">
                          {singleProduct?.color_styles?.map((color, index) => (
                            <div
                              key={index}
                              className={`relative w-6 h-6 rounded-full cursor-pointer border ${
                                selectedColor === color
                                  ? "border-red"
                                  : "border-gray-400"
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() => handleColorSelection(color)}
                            >
                              {selectedColor === color && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              )}
              {singleProduct?.sizes?.length > 0 && (
                <div>
                  <div className="text-[#4D5159] text-sm font-gothamNarrow">
                    Size Selection
                  </div>
                  {singleProduct?.sizes && singleProduct?.sizes?.length > 0 && (
                    <div className="flex items-center flex-wrap justify-start my-2 gap-3">
                      {singleProduct?.sizes?.map((size, index) => (
                        <div
                          key={index}
                          className={`w-12 h-12 border cursor-pointer font-gothamNarrow flex items-center justify-center ${
                            selectedSize === size
                              ? "border-[#f3232B]"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleSizeSelection(size)}
                        >
                          <span className="text-black text-sm text-center font-gothamNarrow">
                            {size}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="text-[#4D5159] text-sm font-gothamNarrow">
                Packaging
              </div>
              <div className="text-lg text-[#4A4545] font-medium font-gothamNarrow">
                {singleProduct?.packaging}
              </div>
              <div className="text-[#4D5159] text-sm font-gothamNarrow">
                Power
              </div>
              <div className="text-xl text-[#4A4545] font-gothamNarrow">
                {singleProduct?.power}
              </div>
              <div className="flex w-full flex-col gap-4 my-2">
                {/* Link to request a bulk quote */}
                <Link to={"#"} className="w-full">
                  <RippleButton
                    label="REQUEST A BULK QUOTE"
                    rippleColor="#071C2E"
                    className="flex justify-center items-center w-full py-3 px-4 border border-gray-500 text-center text-[#272626] font-semibold font-gothamNarrow"
                    onClick={handleBulkQuoteClick}
                  >
                    <FaArrowRight className="ml-2" />
                  </RippleButton>
                </Link>

                {/* Link to add personalization */}

                <RippleButton
                  label="ADD PERSONALIZATION"
                  rippleColor="#071C2E"
                  className="flex justify-center items-center w-full py-3 px-4 border border-gray-500 text-center text-[#000000] font-semibold font-gothamNarrow"
                  onClick={handlePersonalizationClick}
                >
                  <FaArrowRight className="ml-2" />
                </RippleButton>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-4xl p-6 relative mx-4 md:mx-6">
                      <BaltraPersonalization
                        selectedColor={selectedColor}
                        selectedSize={selectedSize}
                        mainImage={selectedImage}
                        productId={singleProduct.id}
                        closeModal={closeModal}
                      />
                    </div>
                  </div>
                )}

                {quoteModalOpen && (
                  <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <div className="w-full max-w-4xl p-6 relative mx-4 md:mx-6">
                      <BaltraQuoteModal
                        productId={singleProduct.id}
                        bulkImage={selectedImage}
                        QuoteCloseModal={QuoteCloseModal}
                        model_name={selectedModalName}
                        model_num={selectedModalNumber}
                        customer={customer}
                      />
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-t w-full border-gray-300" />
            </div>
          </div>
          <ProductDescription singleProduct={singleProduct} />
          <ProductVaccum singleProduct={singleProduct} />
          <ProductDetailsVideo singleProduct={singleProduct} />
          <RatingReviewsSection />
          <RelatedProducts
            allRelatedProducts={allRelatedProducts}
            isFetching={isFetching}
          />
        </div>
      )}
    </>
  );
};

export default ProductViewDetails;
