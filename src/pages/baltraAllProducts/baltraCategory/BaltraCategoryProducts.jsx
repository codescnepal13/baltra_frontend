import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  baltraCategoryProducts,
  clearProductError,
} from "../../../redux/features/product/productSlice";

import { CATEGORY_KEYWORDS } from "../../../seo/keywords";
import CategorySkeleton from "./categorySkeleton/CategorySkeleton";

const SITE_URL = "https://np.baltra.in";
const EAGER_IMAGE_COUNT = 4;

const CARD_WRAPPER_CLASS =
  "w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]";

const toAbsoluteUrl = (value) => {
  if (!value) return undefined;
  if (value.startsWith("http")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

// Single page-load reveal, staggered slightly per card.
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Reduced-motion version: no movement, instant appearance.
const reducedCardVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

// Builds one natural, human-readable phrase per category (used for the link title).
const getCategoryDescriptor = (item) => {
  const terms = (item.slug && CATEGORY_KEYWORDS[item.slug]) || [];

  const priceTerm = terms.find((term) => term.toLowerCase().includes("price"));

  return priceTerm
    ? `${item.name} - ${priceTerm}`
    : `${item.name} - Baltra Nepal`;
};

const BaltraCategoryCard = ({ item, index = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px",
  });

  const descriptor = getCategoryDescriptor(item);
  const categoryUrl = `/baltra-newsubcategory/${item.id}`;

  return (
    <motion.div
      ref={ref}
      variants={shouldReduceMotion ? reducedCardVariants : cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={(index % 8) * 0.05}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className="h-full"
    >
      <Link
        to={categoryUrl}
        title={descriptor}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-200 hover:shadow-lg"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#FAF7F2] to-[#F1EAD9] p-2 xs:p-2.5">
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.name}
              loading={index < EAGER_IMAGE_COUNT ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.06]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col items-start gap-1.5 p-3 xs:p-3.5 sm:gap-2 sm:p-4">
          <h3 className="line-clamp-2 w-full min-h-[2.2em] font-gothamNarrow text-[12px] font-semibold leading-tight text-[#1C1917] xs:text-[13px] sm:text-sm lg:text-base">
            {item.name}
          </h3>

          <span className="mt-auto inline-flex items-center gap-1 font-gothamNarrow text-[11px] font-medium text-[#C41E3A] sm:text-xs">
            Explore
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M2 7h9.5M7.5 3l4.5 4-4.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const BaltraCategoryProducts = () => {
  const { loading, error, categoryProducts } = useSelector(
    (state) => state.product,
  );

  const dispatch = useDispatch();

  const fetchCategories = useCallback(() => {
    dispatch(clearProductError());
    dispatch(baltraCategoryProducts());
  }, [dispatch]);

  // Fetch on mount.
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Clear any leftover error when leaving the page, so it doesn't leak elsewhere.
  useEffect(() => {
    return () => {
      dispatch(clearProductError());
    };
  }, [dispatch]);

  const categories = useMemo(
    () =>
      Array.isArray(categoryProducts)
        ? categoryProducts.filter((item) => item?.id && item?.name)
        : [],
    [categoryProducts],
  );

  /*
   * ItemList schema for the category listing.
   * URLs match the React Router route: /baltra-newsubcategory/:id
   */
  const itemListSchema = useMemo(() => {
    if (categories.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Baltra Product Categories",
      numberOfItems: categories.length,
      itemListElement: categories.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}/baltra-newsubcategory/${item.id}`,
        ...(item.image_url && { image: toAbsoluteUrl(item.image_url) }),
      })),
    };
  }, [categories]);

  const renderSkeletons = (length) =>
    Array.from({ length }).map((_, index) => (
      <div key={index} className={CARD_WRAPPER_CLASS}>
        <CategorySkeleton />
      </div>
    ));

  const content = useMemo(() => {
    if (categories.length === 0) {
      return error ? (
        <div className="flex w-full flex-col items-center gap-3 py-10 text-center">
          <span className="font-gothamNarrow text-sm text-[#8A8378]">
            Something went wrong while loading categories.
          </span>
          <button
            type="button"
            onClick={fetchCategories}
            className="rounded-full bg-[#C41E3A] px-5 py-2 font-gothamNarrow text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            Try again
          </button>
        </div>
      ) : (
        <span className="w-full py-10 text-center font-gothamNarrow text-sm text-[#8A8378]">
          No categories to show right now.
        </span>
      );
    }

    return categories.map((item, index) => (
      <div key={item.id} className={CARD_WRAPPER_CLASS}>
        <BaltraCategoryCard item={item} index={index} />
      </div>
    ));
  }, [categories, error, fetchCategories]);

  return (
    <div className="container mx-auto bg-[#FDFBF7] px-3 py-6 sm:px-4 sm:py-8 lg:px-14">
      {itemListSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(itemListSchema)}
          </script>
        </Helmet>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {loading ? renderSkeletons(8) : content}
      </div>
    </div>
  );
};

export default BaltraCategoryProducts;
