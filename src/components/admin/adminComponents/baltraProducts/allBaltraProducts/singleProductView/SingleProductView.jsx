import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearAdminError,
  singleProductView,
} from "../../../../../../redux/features/admin/adminSlice";
import MetaData from "../../../../../layout/metaData/MetaData";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import ProductViewSkeleton from "../../../../../layout/productViewSkeleton/ProductViewSkeleton";
import { FaCheck, FaTimes } from "react-icons/fa";
import DescriptionSection from "./descriptionSection/DescriptionSection";
import moment from "moment";

const SingleProductView = () => {
  const { loading, error, addProduct } = useSelector((state) => state.admin);
  const { id } = useParams();

  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const handleColorSelection = (color) => {
    setSelectedColor(color);
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
  return (
    <>
      <MetaData title="Baltra-admin-dashboard-SingleProductView" />
      <div className="font-gothamNarrow px-8 flex items-center">
        <Link
          to="/baltra-admin-dashboard/all-products-list"
          className="flex items-center font-gothamNarrow"
        >
          <HiOutlineArrowLeftCircle size={24} className="mr-2" />
          View Single Product
        </Link>
      </div>
      {loading ? (
        <ProductViewSkeleton />
      ) : (
        <>
          <div className="bg-[#ffffff] my-5 px-8 py-8 flex flex-col md:flex-row lg:gap-x-24 overflow-hidden">
            {/* Left side - Image Section */}
            <div className="flex flex-col items-center">
              <div className="relative mb-8 flex flex-col items-center">
                <img
                  className="w-full h-auto"
                  src={addProduct?.main_image}
                  alt="SingleProductImg"
                />
                <img
                  className="absolute top-0 right-[-24px] md:right-[-48px] lg:right-[-96px] w-16 h-16 md:w-24 md:h-24"
                  src={addProduct?.warranty_icon}
                  alt="Warranty"
                />
              </div>
              {addProduct && (
                <div className="flex gap-4 lg:ml-6 my-2">
                  {addProduct?.images?.map((image, index) => (
                    <img
                      key={index}
                      className="w-32 h-32 border-t border-gray-100"
                      src={image.image_url}
                      alt={`Variant ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Content Section */}
            <div className="flex flex-col gap-2 ml-0 md:ml-8 md:w-1/2 lg:w-7/12">
              <div className="text-right">
                <i className="icon-share"></i>
              </div>
              <div>
                <div className="flex items-center">
                  <div className="text-[#4D5159] font-medium font-gothamNarrow">
                    Model Name:
                  </div>
                  <div className="text-black text-base font-gothamNarrow">
                    {addProduct?.model_name}
                  </div>
                </div>
                <div className="flex gap-x-8 items-center">
                  <div className="text-[#4D5159] font-gothamNarrow">
                    Category Name:
                  </div>
                  <h2 className="text-lg md:text-xl text-[#202D31] font-gothamNarrow my-1">
                    {addProduct?.category?.category_name}
                  </h2>
                </div>

                <div className="flex gap-x-8 items-center">
                  <div className="text-[#4D5159] font-gothamNarrow">
                    Sub Category:
                  </div>
                  <h2 className="text-sm md:text-base text-[#202D31] font-bold font-gothamNarrow my-1">
                    {addProduct?.sub_category?.sub_category_name}
                  </h2>
                </div>

                <div className="flex gap-x-8 items-center">
                  <div className="text-[#4D5159] font-medium font-gothamNarrow">
                    Sub Heading:
                  </div>
                  <h2 className="text-xl text-[#202D31] font-bold font-gothamNarrow my-1">
                    {addProduct?.sub_heading}
                  </h2>
                </div>
              </div>
              <div className="flex gap-x-8 items-center">
                <div className="text-[#4D5159] font-medium font-gothamNarrow">
                  Price:
                </div>
                <h2 className="text-xl text-[#202D31] font-bold font-gothamNarrow my-1">
                  <div className="text-[#ED1C24] text-xl font-medium tracking-normal">
                    Rs.{addProduct?.price}
                  </div>
                </h2>
              </div>
              {/* isInStock */}
              <div className="flex gap-x-8 items-center">
                <div className="text-[#4D5159] font-medium  font-gothamNarrow">
                  InStock:
                </div>
                <div>
                  {addProduct?.stocks ? (
                    <div className="flex items-center text-green-500">
                      <FaCheck />
                      <span className="ml-1">
                        In Stock ({addProduct?.stocks}) Available
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <FaTimes />
                      <span className="ml-1">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>
              {addProduct?.color_styles?.length > 0 && (
                <div className="flex gap-x-8 items-center">
                  <div className="text-[#4D5159] font-medium font-gothamNarrow">
                    Color Styles:
                  </div>
                  <div className="my-4">
                    {addProduct?.color_styles &&
                      addProduct?.color_styles?.length > 0 && (
                        <div className="flex items-center flex-wrap justify-start my-2 gap-4">
                          {addProduct?.color_styles?.map((color, index) => (
                            <div
                              key={index}
                              className={`relative w-6 h-6 rounded-full cursor-pointer border ${
                                selectedColor === color
                                  ? "border-black"
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
              {addProduct?.sizes?.length > 0 && (
                <div className="flex gap-x-8 items-center">
                  <div className="text-[#4D5159] font-medium font-gothamNarrow">
                    Size Fit:
                  </div>
                  <div>
                    <div className="flex items-center flex-wrap justify-start my-2 gap-3">
                      {addProduct?.sizes?.map((size, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 border cursor-pointer flex items-center justify-center"
                        >
                          <span className="text-black text-center">{size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-x-8 items-center">
                <div className="text-[#4D5159] font-medium font-gothamNarrow">
                  Packaging:
                </div>
                <div className="text-sm text-[#4A4545] font-semibold font-gothamNarrow">
                  {addProduct?.packaging}
                </div>
              </div>
              <div className="flex gap-x-8 items-center">
                <div className="text-[#4D5159] font-medium font-gothamNarrow">
                  Model Number:
                </div>
                <div className="text-sm text-[#4A4545] font-semibold font-gothamNarrow">
                  {addProduct?.model_num}
                </div>
              </div>
              <div className="flex gap-x-8 items-center">
                <div className="text-[#4D5159] font-medium font-gothamNarrow">
                  Power:
                </div>
                <div className="text-sm text-[#4A4545] font-gothamNarrow">
                  <div className="text-sm text-[#4A4545 font-semibold] font-gothamNarrow">
                    {addProduct?.power}
                  </div>
                </div>
              </div>

              <div className="flex gap-x-8 items-center">
                <div className="text-[#4D5159] font-medium font-gothamNarrow">
                  Warranty:
                </div>
                <div className="text-sm text-[#4A4545] font-gothamNarrow">
                  <div className="text-sm text-[#4A4545] font-gothamNarrow">
                    <div className="text-sm text-[#4A4545] font-semibold font-gothamNarrow">
                      {addProduct?.warranty}
                    </div>
                  </div>
                </div>
              </div>
              {addProduct?.reward_points && (
                <div className="flex gap-x-8 items-center">
                  <div className="text-[#4D5159] font-medium font-gothamNarrow">
                    RewardPoints:
                  </div>
                  <div className="text-sm text-[#4A4545] font-gothamNarrow">
                    <div className="text-sm text-[#4A4545] font-gothamNarrow">
                      <div className="text-sm text-[#4A4545] font-semibold font-gothamNarrow">
                        {addProduct?.reward_points}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-x-8 items-center">
                <div className="text-[#4D5159] font-medium font-gothamNarrow">
                  Created At:
                </div>
                <div className="text-sm text-[#4A4545] font-gothamNarrow">
                  <div className="text-sm text-[#4A4545] font-gothamNarrow">
                    <div className="text-sm text-[#4A4545] font-semibold font-gothamNarrow">
                      {moment(addProduct?.date_joined).format(
                        "dddd, D MMM YYYY"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DescriptionSection addProduct={addProduct} />
        </>
      )}
    </>
  );
};

export default SingleProductView;
