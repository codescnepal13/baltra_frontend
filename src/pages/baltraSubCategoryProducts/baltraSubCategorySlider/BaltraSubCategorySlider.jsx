import { useEffect, useRef, useState } from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baltraSubCategoryRelatedProducts } from "../../../redux/features/product/productSlice";
import BaltraSubCategoryProductList from "../baltraSubCategoryProducts/BaltraSubCategoryProductList";
import "./BaltraSlider.css";
import BaltraSubCategorySliderCard from "./BaltraSubCategorySliderCard";

const BaltraSubCategorySlider = ({ subCategoryProducts = [] }) => {
  const { isLoading, subCategoryRelatedProducts } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  // Store only the selected ID, not the object reference
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

  const scrollNext = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollPrevious = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleCardClick = (subCategory) => {
    setSelectedSubCategoryId(subCategory.id);
  };

  // Initialize selection once data first arrives
  useEffect(() => {
    if (subCategoryProducts.length > 0 && selectedSubCategoryId === null) {
      setSelectedSubCategoryId(subCategoryProducts[0].id);
    }
  }, [subCategoryProducts, selectedSubCategoryId]);

  // Fetch related products only when the selected ID actually changes
  useEffect(() => {
    if (selectedSubCategoryId !== null) {
      dispatch(baltraSubCategoryRelatedProducts(selectedSubCategoryId));
    }
  }, [dispatch, selectedSubCategoryId]);

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

          <button
            onClick={scrollPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 md:p-2 z-10"
          >
            <AiOutlineLeftCircle size={24} md={28} />
          </button>

          {/*
            Fixed-height row so every slide lines up regardless of
            how long the sub-category name is. Each item is a flex
            column with a fixed-size image slot on top and a
            fixed-height text slot below, both centered.
          */}
          <div
            className="flex overflow-x-scroll scrollbar-hide px-4 sm:px-6 items-stretch"
            ref={sliderRef}
          >
            {subCategoryProducts && subCategoryProducts.length > 0 ? (
              subCategoryProducts.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex-none w-1/3 sm:w-1/4 md:w-[14.28%] px-2 md:px-4 cursor-pointer flex flex-col items-center justify-start h-[120px] sm:h-[135px] md:h-[150px] ${
                    index === subCategoryProducts.length - 1 ? "mr-4" : ""
                  }`}
                  onClick={() => handleCardClick(item)}
                >
                  <div className="w-full h-full flex flex-col items-center justify-between">
                    <BaltraSubCategorySliderCard
                      item={item}
                      index={index}
                      isSelected={selectedSubCategoryId === item.id}
                    />
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center w-full">No Data Found</h2>
            )}
          </div>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 md:p-2 z-10"
          >
            <AiOutlineRightCircle size={24} md={28} />
          </button>
        </div>

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
