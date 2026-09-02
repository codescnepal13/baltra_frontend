import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductHeader from "../../../components/topHeader/productHeader/ProductHeader";
import {
  baltraSubCategoryProducts,
  clearProductError,
} from "../../../redux/features/product/productSlice";
import BaltraSubCategorySkeleton from "../baltraSubCategorySkeleton/BaltraSubCategorySkeleton";
import BaltraSubCategorySlider from "../baltraSubCategorySlider/BaltraSubCategorySlider";

const FALLBACK_BANNER = "/images/default-category-banner.jpg"; // put a small local fallback in /public

const BaltraSubCategoryBanner = () => {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const { loading, subCategoryProducts, categoryInfo } = useSelector(
    (state) => state.product,
  );

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!category_id) return;

    dispatch(clearProductError());
    dispatch(baltraSubCategoryProducts(category_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, category_id]);

  // Reset image state whenever the banner URL changes (new category)
  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [categoryInfo?.category_banner]);

  if (loading) {
    return <BaltraSubCategorySkeleton />;
  }

  const bannerSrc =
    imgError || !categoryInfo?.category_banner
      ? FALLBACK_BANNER
      : categoryInfo.category_banner;

  return (
    <div>
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] relative overflow-hidden bg-gray-100">
        {/* Shimmer placeholder shown until the real image has decoded */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]" />
        )}

        {/* Actual banner as an <img>, not a CSS background — lets the browser
            lazy-decode, report load/error events, and prioritize it correctly */}
        <img
          src={bannerSrc}
          alt={categoryInfo?.category_name || "Category banner"}
          fetchpriority="high"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute top-0 left-0 w-full z-10">
          <ProductHeader />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 px-4 z-[5]">
          <div className="text-center text-[#000000] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-gothamNarrow">
            {categoryInfo?.category_name}
          </div>
          <h4 className="text-center text-[#000000] text-sm sm:text-base md:text-lg font-gothamNarrow">
            {categoryInfo?.desc}
          </h4>
        </div>
      </div>

      <BaltraSubCategorySlider subCategoryProducts={subCategoryProducts} />
    </div>
  );
};

export default BaltraSubCategoryBanner;
