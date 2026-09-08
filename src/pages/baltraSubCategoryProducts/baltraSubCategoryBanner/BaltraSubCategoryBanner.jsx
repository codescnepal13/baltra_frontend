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
      {/* min-h instead of a hard h- lets the box grow if a very long
          category name/description wraps to more lines than a fixed
          height allows for — protects against clipped text on any
          device instead of just scaling a fixed number. */}
      <div className="relative w-full min-h-[260px] overflow-hidden bg-gray-100 sm:min-h-[340px] md:min-h-[440px] lg:min-h-[520px]">
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
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Soft scrim so title text stays readable over busy photos on
            every device, not just where the source image happens to be dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

        <div className="absolute left-0 top-0 z-10 w-full">
          <ProductHeader />
        </div>

        {/* pt-20 reserves space so the fixed header never sits on top of
            the title on short mobile banners; px-6 keeps long titles off
            the viewport edge instead of touching it. */}
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-2 px-6 pt-20 text-center sm:pt-24">
          <h1 className="max-w-3xl text-2xl font-semibold leading-tight text-black font-gothamNarrow sm:text-3xl md:text-4xl lg:text-5xl">
            {categoryInfo?.category_name}
          </h1>
          {categoryInfo?.desc && (
            <p className="max-w-xl text-sm text-black/80 font-gothamNarrow sm:text-base md:text-lg">
              {categoryInfo.desc}
            </p>
          )}
        </div>
      </div>

      <BaltraSubCategorySlider subCategoryProducts={subCategoryProducts} />
    </div>
  );
};

export default BaltraSubCategoryBanner;
