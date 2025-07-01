import React, { useEffect, useRef, useState } from "react";
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import BaltraSubCategorySliderCard from "./BaltraSubCategorySliderCard";
import BaltraSubCategoryProductList from "../baltraSubCategoryProducts/BaltraSubCategoryProductList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baltraSubCategoryRelatedProducts } from "../../../redux/features/product/productSlice";
import "./BaltraSlider.css";

const BaltraSubCategorySlider = ({ subCategoryProducts = [] }) => {
  const { isLoading, subCategoryRelatedProducts } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    subCategoryProducts[0] || null
  );

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleCardClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  useEffect(() => {
    if (selectedSubCategory) {
      dispatch(baltraSubCategoryRelatedProducts(selectedSubCategory.id));
    }
  }, [dispatch, selectedSubCategory]);

  return (
    <div className="bg-gray-50 px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="bg-white py-8 px-2 relative sm:-top-10 md:-top-16 lg:-top-24">
        <div className="relative">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold font-gothamNarrow text-center mb-4">
            Select SubCategory
          </h2>
          <Link
            to="/baltra-allProducts"
            className="absolute top-1 md:top-0 left-2 md:left-4"
          >
            <FaArrowLeft size={20} md={24} />
          </Link>

          {/* Left Scroll Button */}
          <button
            onClick={scrollPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 md:p-2 z-10"
          >
            <AiOutlineLeftCircle size={24} md={28} />
          </button>

          {/* Scrollable Subcategory Products */}
          <div
            className="flex overflow-x-scroll scrollbar-hide px-4 sm:px-6"
            ref={sliderRef}
          >
            {subCategoryProducts && subCategoryProducts.length > 0 ? (
              subCategoryProducts.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex-none w-1/3 sm:w-1/4 md:w-[14.28%] px-2 md:px-4 cursor-pointer ${
                    index === 0 ? "ml-0" : ""
                  } ${index === subCategoryProducts.length - 1 ? "mr-4" : ""}`}
                  onClick={() => handleCardClick(item)}
                >
                  <BaltraSubCategorySliderCard
                    item={item}
                    index={index}
                    isSelected={
                      selectedSubCategory && selectedSubCategory.id === item.id
                    }
                  />
                </div>
              ))
            ) : (
              <h2 className="text-center w-full">No Data Found</h2>
            )}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 md:p-2 z-10"
          >
            <AiOutlineRightCircle size={24} md={28} />
          </button>
        </div>

        {/* SubCategory Product List */}
        <div className="px-0 md:px-8 py-6 sm:py-8">
          <BaltraSubCategoryProductList
            products={subCategoryRelatedProducts}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BaltraSubCategorySlider;
