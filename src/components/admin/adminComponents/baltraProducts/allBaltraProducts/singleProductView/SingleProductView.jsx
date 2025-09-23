import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaAward,
  FaCalendarAlt,
  FaCheck,
  FaCog,
  FaShoppingCart,
  FaTag,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearAdminError,
  singleProductView,
} from "../../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../../layout/metaData/MetaData";
import ProductViewSkeleton from "../../../../../layout/productViewSkeleton/ProductViewSkeleton";

const SingleProductView = () => {
  const { loading, error, addProduct } = useSelector((state) => state.admin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (id) {
      dispatch(singleProductView(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (addProduct?.main_image) {
      setSelectedImage(addProduct.main_image);
    }
  }, [addProduct]);

  const InfoItem = ({ icon, label, value, className = "" }) => (
    <div
      className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 ${className}`}
    >
      <div className="text-blue-600 flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <span className="text-sm font-medium text-gray-600 block">{label}</span>
        <span className="text-base font-semibold text-gray-900">{value}</span>
      </div>
    </div>
  );

  return (
    <>
      <MetaData title="Baltra-admin-dashboard-SingleProductView" />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <Link
            to="/baltra-admin-dashboard/all-products-list"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <HiOutlineArrowLeftCircle size={24} className="mr-2" />
            <span>Back to Products</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Product Details
          </h1>
        </div>
      </div>

      {loading ? (
        <ProductViewSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50 py-6">
          <div className="max-w-7xl mx-auto px-6">
            {/* Product Header */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {addProduct?.name}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {addProduct?.sub_heading}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600 mb-1">
                      Rs. {addProduct?.price?.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {addProduct?.stocks > 0 ? (
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <FaCheck className="mr-1" />
                          <span className="text-sm font-medium">
                            In Stock ({addProduct?.stocks})
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full">
                          <FaTimes className="mr-1" />
                          <span className="text-sm font-medium">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <img
                      className="w-full h-96 object-contain"
                      src={selectedImage || addProduct?.main_image}
                      alt="Product"
                    />
                    {addProduct?.warranty_icon && (
                      <img
                        className="absolute top-4 right-4 w-16 h-16"
                        src={addProduct?.warranty_icon}
                        alt="Warranty"
                      />
                    )}
                  </div>

                  {/* Thumbnail Images */}
                  {addProduct?.images?.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      <img
                        className={`w-20 h-20 object-contain border-2 rounded cursor-pointer transition-all ${
                          selectedImage === addProduct?.main_image
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        src={addProduct?.main_image}
                        alt="Main"
                        onClick={() =>
                          handleImageSelect(addProduct?.main_image)
                        }
                      />
                      {addProduct?.images?.map((image, index) => (
                        <img
                          key={index}
                          className={`w-20 h-20 object-contain border-2 rounded cursor-pointer transition-all ${
                            selectedImage === image.image_url
                              ? "border-blue-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          src={image.image_url}
                          alt={`Variant ${index + 1}`}
                          onClick={() => handleImageSelect(image.image_url)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                  {/* Category Information */}
                  <div className="grid grid-cols-1 gap-4">
                    <InfoItem
                      icon={<FaTag />}
                      label="Category"
                      value={addProduct?.category?.category_name}
                    />
                    <InfoItem
                      icon={<FaTag />}
                      label="Sub Category"
                      value={addProduct?.sub_category?.sub_category_name}
                    />
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                      icon={<FaCog />}
                      label="Model Name"
                      value={addProduct?.model_name}
                    />
                    <InfoItem
                      icon={<FaCog />}
                      label="Model Number"
                      value={addProduct?.model_num}
                    />
                    <InfoItem
                      icon={<FaCog />}
                      label="Power"
                      value={addProduct?.power}
                    />
                    <InfoItem
                      icon={<FaAward />}
                      label="Warranty"
                      value={`${addProduct?.warranty} months`}
                    />
                    <InfoItem
                      icon={<FaShoppingCart />}
                      label="Packaging"
                      value={addProduct?.packaging}
                    />
                    <InfoItem
                      icon={<FaCalendarAlt />}
                      label="Created"
                      value={moment(addProduct?.date_joined).format(
                        "DD MMM YYYY"
                      )}
                    />
                  </div>

                  {/* Color Styles */}
                  {addProduct?.color_styles?.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Available Colors
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {addProduct?.color_styles?.map((color, index) => (
                          <div
                            key={index}
                            className={`relative w-10 h-10 rounded-full cursor-pointer border-2 transition-all hover:scale-110 ${
                              selectedColor === color
                                ? "border-gray-800 shadow-lg"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelection(color)}
                            title={color}
                          >
                            {selectedColor === color && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-white drop-shadow"
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
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Options */}
                  {addProduct?.sizes?.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Available Sizes
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {addProduct?.sizes?.map((size, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <span className="font-medium text-gray-700">
                              {size}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reward Points */}
                  {addProduct?.reward_points > 0 && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center gap-2">
                        <FaAward className="text-yellow-600" />
                        <span className="text-lg font-semibold text-gray-900">
                          Reward Points: {addProduct?.reward_points}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Sections */}
            {(addProduct?.specification ||
              addProduct?.sizing ||
              addProduct?.usage) && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Specifications */}
                {addProduct?.specification && (
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-blue-600 text-white px-6 py-4">
                      <h3 className="text-xl font-bold">Specifications</h3>
                    </div>
                    <div className="p-6">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: addProduct?.specification,
                        }}
                      />
                      {addProduct?.specification_images?.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {addProduct?.specification_images?.map(
                            (img, index) => (
                              <img
                                key={index}
                                src={img.image_url}
                                alt={`Specification ${index + 1}`}
                                className="w-full rounded-lg border border-gray-200"
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sizing */}
                {addProduct?.sizing && (
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-green-600 text-white px-6 py-4">
                      <h3 className="text-xl font-bold">Sizing Information</h3>
                    </div>
                    <div className="p-6">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: addProduct?.sizing }}
                      />
                      {addProduct?.sizing_images?.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {addProduct?.sizing_images?.map((img, index) => (
                            <img
                              key={index}
                              src={img.image_url}
                              alt={`Sizing ${index + 1}`}
                              className="w-full rounded-lg border border-gray-200"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Usage */}
                {addProduct?.usage && (
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-purple-600 text-white px-6 py-4">
                      <h3 className="text-xl font-bold">Usage Instructions</h3>
                    </div>
                    <div className="p-6">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: addProduct?.usage }}
                      />
                      {addProduct?.usage_images?.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {addProduct?.usage_images?.map((img, index) => (
                            <img
                              key={index}
                              src={img.image_url}
                              alt={`Usage ${index + 1}`}
                              className="w-full rounded-lg border border-gray-200"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Section */}
            {(addProduct?.galleryimageone || addProduct?.galleryimagetwo) && (
              <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-800 text-white px-6 py-4">
                  <h3 className="text-xl font-bold">Product Gallery</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addProduct?.galleryimageone && (
                    <img
                      src={addProduct?.galleryimageone}
                      alt="Gallery Image 1"
                      className="w-full rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                    />
                  )}
                  {addProduct?.galleryimagetwo && (
                    <img
                      src={addProduct?.galleryimagetwo}
                      alt="Gallery Image 2"
                      className="w-full rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Video Section */}
            {addProduct?.product_video && (
              <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-red-600 text-white px-6 py-4">
                  <h3 className="text-xl font-bold">Product Video</h3>
                </div>
                <div className="p-6">
                  <video
                    controls
                    className="w-full rounded-lg border border-gray-200"
                    style={{ maxHeight: "400px" }}
                  >
                    <source src={addProduct?.product_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductView;
