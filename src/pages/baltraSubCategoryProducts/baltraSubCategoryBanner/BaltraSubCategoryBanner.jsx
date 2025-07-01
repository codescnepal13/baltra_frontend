import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaltraSubCategorySlider from "../baltraSubCategorySlider/BaltraSubCategorySlider";
import BaltraSubCategorySkeleton from "../baltraSubCategorySkeleton/BaltraSubCategorySkeleton";
import {
  baltraSubCategoryProducts,
  clearProductError,
} from "../../../redux/features/product/productSlice";
import BaltraSubCategoryHeader from "../baltraSubCategoryHeader/BaltraSubCategoryHeader";

const BaltraSubCategoryBanner = () => {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, subCategoryProducts, categoryInfo } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (category_id) {
      if (error) {
        dispatch(clearProductError());
      }
      dispatch(baltraSubCategoryProducts(category_id));
    }
  }, [dispatch, category_id, error]);

  if (loading) {
    return <BaltraSubCategorySkeleton />;
  }

  return (
    <div>
      {/* Banner Section */}
      <div
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] flex justify-center items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${categoryInfo?.category_banner})` }}
      >
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 w-full z-10">
          <BaltraSubCategoryHeader />
        </div>

        {/* Category Information */}
        <div className="flex flex-col justify-center items-center gap-2 px-4">
          <div className="text-center text-[#000000] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-gothamNarrow">
            {categoryInfo?.category_name}
          </div>
          <h4 className="text-center text-[#000000] text-sm sm:text-base md:text-lg font-gothamNarrow">
            {categoryInfo?.desc}
          </h4>
        </div>
      </div>

      {/* Slider Section */}
      <BaltraSubCategorySlider subCategoryProducts={subCategoryProducts} />
    </div>
  );
};

export default BaltraSubCategoryBanner;
