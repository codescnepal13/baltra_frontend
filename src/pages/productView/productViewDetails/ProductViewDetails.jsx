import { AnimatePresence, motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { FaEye, FaHeart, FaTimes } from "react-icons/fa";
import {
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const RippleButton = ({
  label,
  rippleColor,
  onClick,
  children,
  variant = "primary",
}) => {
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

  const baseClasses =
    "w-full py-4 px-6 font-semibold font-gothamNarrow relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl";
  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-red-600 to-red-700 text-white border border-red-600"
      : "bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses} rounded-xl`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
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
              opacity: 0.3,
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

      <span
        className={`relative z-10 flex items-center justify-center gap-2 text-lg ${
          isHovered && variant === "secondary" ? "text-white" : ""
        }`}
      >
        {label}
        {children}
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

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedModalName, setSelectedModalName] = useState("");
  const [selectedModalNumber, setSelectedModalNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [imageViews, setImageViews] = useState(0);

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

  const isBottleOrFlaskCategory = () => {
    const name = singleProduct?.category?.category_name?.toLowerCase() || "";
    return (
      name.includes("bottle") ||
      (name.includes("bottles") &&
        (name.includes("flask") || name.includes("flasks")))
    );
  };

  const handlePersonalizationClick = () => {
    if (isBottleOrFlaskCategory()) {
      if (singleProduct?.sizes?.length > 0 && !selectedSize) {
        enqueueSnackbar("Please Select a size.", { variant: "error" });
      } else if (singleProduct?.color_styles?.length > 0 && !selectedColor) {
        enqueueSnackbar("Please Select a color.", { variant: "error" });
      } else {
        setIsModalOpen(true);
      }
    } else {
      enqueueSnackbar(
        "Personalization is only available for Bottles and Flasks.",
        { variant: "error" }
      );
    }
  };

  const handleBulkQuoteClick = () => {
    if (isAuthenticated) {
      setQuoteModalOpen(true);
    } else {
      enqueueSnackbar("Please Login first", { variant: "error" });
    }
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageViews((prev) => prev + 1);
  };

  useEffect(() => {
    setSelectedImage(singleProduct?.main_image);
    setSelectedModalName(singleProduct?.model_name);
    setSelectedModalNumber(singleProduct?.model_num);
  }, [singleProduct]);

  const closeModal = () => setIsModalOpen(false);
  const QuoteCloseModal = () => setQuoteModalOpen(false);
  const handleMouseLeave = () => setSelectedImage(singleProduct?.main_image);
  const handleTogglePopup = () => setPopupVisible(!isPopupVisible);
  const handleColorSelection = (color) => setSelectedColor(color);
  const handleSizeSelection = (size) => setSelectedSize(size);

  useEffect(() => {
    if (id) {
      dispatch(baltraProductsRelated(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <ProductViewSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="text-sm text-gray-600">
            <Link
              to={`/category/${singleProduct?.category?.id}`}
              className="hover:text-red-600 transition-colors font-medium"
            >
              {singleProduct?.category?.category_name}
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/subcategory/${singleProduct?.sub_category?.id}`}
              className="hover:text-red-600 transition-colors font-medium"
            >
              {singleProduct?.sub_category?.sub_category_name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">
              {singleProduct?.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Image Section */}
            <div className="relative">
              <div className="sticky top-8">
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-6 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-96 object-contain relative z-10"
                    src={selectedImage}
                    alt="Product"
                    loading="lazy"
                    onMouseMove={handleMouseMove}
                    onMouseOut={handleMouseOut}
                  />

                  {/* Zoom Effect */}
                  {isZoomVisible && (
                    <div
                      className="absolute inset-0 bg-contain bg-no-repeat pointer-events-none z-20 rounded-2xl"
                      style={{
                        backgroundImage: `url(${selectedImage})`,
                        backgroundPositionX: zoomPosition.backgroundPositionX,
                        backgroundPositionY: zoomPosition.backgroundPositionY,
                        backgroundSize: "200%",
                      }}
                    />
                  )}

                  {/* Warranty Badge */}
                  {singleProduct?.warranty_icon && (
                    <motion.img
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="absolute -top-2 -right-2 w-16 h-16 md:w-20 md:h-20 z-30"
                      src={singleProduct?.warranty_icon}
                      alt="Warranty"
                    />
                  )}

                  {/* View Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <FaEye size={12} />
                    <span>{imageViews}</span>
                  </div>
                </div>

                {/* Thumbnail Images */}
                {singleProduct?.images?.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-3 transition-all ${
                        selectedImage === singleProduct?.main_image
                          ? "border-red-500 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        handleImageSelect(singleProduct?.main_image)
                      }
                    >
                      <img
                        src={singleProduct?.main_image}
                        alt="Main"
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    </motion.div>
                    {singleProduct.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-3 transition-all ${
                          selectedImage === image.image_url
                            ? "border-red-500 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleImageSelect(image.image_url)}
                      >
                        <img
                          src={image.image_url}
                          alt={`Variant ${index + 1}`}
                          className="w-full h-full object-contain bg-gray-50"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-600 text-lg font-medium mb-2">
                    {singleProduct?.model_name}
                  </p>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3">
                    {singleProduct?.name}
                  </h1>
                  <p className="text-gray-700 text-lg mb-2 font-medium">
                    {singleProduct?.model_num}
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {singleProduct?.sub_heading}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <FaHeart size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={handleTogglePopup}
                  >
                    <CiShare2 size={22} />
                  </motion.button>
                </div>
              </div>

              {/* Price and Rating */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-red-600">
                    ₹{singleProduct?.price?.toLocaleString()}
                    <span className="text-lg text-gray-600 font-normal ml-2">
                      MRP
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating rating={average_rating} />
                  <span className="text-gray-600 font-medium">
                    ({total_reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              {singleProduct?.color_styles?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Select Color
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {singleProduct.color_styles.map((color, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-12 h-12 rounded-full cursor-pointer border-4 transition-all ${
                          selectedColor === color
                            ? "border-gray-800 shadow-lg scale-110"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelection(color)}
                      >
                        {selectedColor === color && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <svg
                              className="w-6 h-6 text-white drop-shadow-lg"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {singleProduct?.sizes?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {singleProduct.sizes.map((size, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-3 min-w-[60px] rounded-xl border-2 font-semibold transition-all ${
                          selectedSize === size
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                        }`}
                        onClick={() => handleSizeSelection(size)}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Specifications */}
              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">
                    PACKAGING
                  </h4>
                  <p className="text-lg font-bold text-gray-900">
                    {singleProduct?.packaging}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">
                    POWER
                  </h4>
                  <p className="text-lg font-bold text-gray-900">
                    {singleProduct?.power}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <RippleButton
                  label="REQUEST A BULK QUOTE"
                  rippleColor="#1f2937"
                  onClick={handleBulkQuoteClick}
                  variant="primary"
                >
                  <FaArrowRight />
                </RippleButton>

                <RippleButton
                  label="ADD PERSONALIZATION"
                  rippleColor="#1f2937"
                  onClick={handlePersonalizationClick}
                  variant="secondary"
                >
                  <FaArrowRight />
                </RippleButton>
              </div>
            </div>
          </div>
        </div>

        {/* Share Popup Modal */}
        <AnimatePresence>
          {isPopupVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleTogglePopup}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full"
              >
                <button
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={handleTogglePopup}
                >
                  <FaTimes size={20} className="text-gray-600" />
                </button>

                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Share Product
                  </h2>
                  <div className="flex justify-center gap-6">
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <FaFacebook size={32} className="text-blue-600" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
                    >
                      <FaInstagram size={32} className="text-pink-600" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <FaTwitter size={32} className="text-blue-400" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <FaYoutube size={32} className="text-red-600" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-4xl mx-4 rounded-3xl overflow-hidden shadow-2xl"
              >
                <BaltraPersonalization
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  mainImage={selectedImage}
                  productId={singleProduct.id}
                  closeModal={closeModal}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {quoteModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-4xl mx-4 rounded-3xl overflow-hidden shadow-2xl"
              >
                <BaltraQuoteModal
                  productId={singleProduct.id}
                  bulkImage={selectedImage}
                  QuoteCloseModal={QuoteCloseModal}
                  model_name={selectedModalName}
                  model_num={selectedModalNumber}
                  customer={customer}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Sections */}
        <ProductDescription singleProduct={singleProduct} />
        <ProductVaccum singleProduct={singleProduct} />
        <ProductDetailsVideo singleProduct={singleProduct} />
        <RatingReviewsSection />
        <RelatedProducts
          allRelatedProducts={allRelatedProducts}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default ProductViewDetails;
