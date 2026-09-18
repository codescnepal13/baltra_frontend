import { motion } from "framer-motion";
import React, { useEffect, useMemo } from "react";
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

// Single page-load reveal, staggered slightly per card. This is the one
// motion moment on this page — hover effects below stay to a single change
// each rather than stacking lift + scale + shadow.
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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

// Builds one natural, human-readable phrase per category instead of
// dumping the whole keyword array into alt/title — that's what keeps
// this useful for SEO rather than looking like keyword stuffing.
const getCategoryDescriptor = (item) => {
  const terms = CATEGORY_KEYWORDS[item.slug] || [];
  const priceTerm = terms.find((t) => t.toLowerCase().includes("price"));
  return priceTerm
    ? `${item.name} - ${priceTerm}`
    : `${item.name} - Baltra Nepal`;
};

const BaltraCategoryCard = ({ item, index = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px",
  });

  const descriptor = getCategoryDescriptor(item);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={(index % 8) * 0.05}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link
        to={`/baltra-newsubcategory/${item.id}`}
        title={descriptor}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-200 hover:shadow-lg"
      >
        {/* Image sits in a warm gradient well, inset rather than bled to the
            edge — reads as a product shot rather than a flat grey box. */}
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#FAF7F2] to-[#F1EAD9] p-2 xs:p-2.5">
          <img
            src={item.image_url}
            alt={descriptor}
            loading="lazy"
            className="h-full w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.06]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="flex flex-1 flex-col items-start gap-1.5 p-3 xs:p-3.5 sm:gap-2 sm:p-4">
          <h3 className="line-clamp-2 w-full min-h-[2.2em] font-gothamNarrow text-[12px] font-semibold leading-tight text-[#1C1917] xs:text-[13px] sm:text-sm lg:text-base">
            {item.name}
          </h3>

          {/* Quiet text link + arrow instead of a solid button block on
              every card — the red is reserved for this one small move. */}
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

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(baltraCategoryProducts());
  }, [dispatch]);

  const renderSkeletons = (length) =>
    Array.from({ length }).map((_, index) => (
      <div
        key={index}
        className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
      >
        <CategorySkeleton />
      </div>
    ));

  // ItemList schema — tells Google this section is a structured list of
  // category pages, which is what can earn a rich "category carousel"
  // result. This is the part that can genuinely help visibility, unlike
  // the meta keywords tag.
  const itemListSchema = useMemo(() => {
    if (!categoryProducts || categoryProducts.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: categoryProducts.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}/baltra-newsubcategory/${item.id}`,
        image: item.image_url,
      })),
    };
  }, [categoryProducts]);

  // Flexbox instead of CSS Grid: Grid can't center a leftover row on its
  // own (a partial last row stays left-aligned), but flex-wrap + a
  // per-item width does — each wrapped line is centered independently, so
  // 7 items at 4-per-row naturally lands as 4 on top and 3 centered below,
  // with no need to special-case the count of 7.
  const productCards = useMemo(() => {
    if (!categoryProducts || categoryProducts.length === 0) {
      return (
        <span className="w-full py-10 text-center font-gothamNarrow text-sm text-[#8A8378]">
          No categories to show right now.
        </span>
      );
    }

    return categoryProducts.map((item, index) => (
      <div
        key={item.id}
        className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]"
      >
        <BaltraCategoryCard item={item} index={index} />
      </div>
    ));
  }, [categoryProducts]);

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
        {loading ? renderSkeletons(8) : productCards}
      </div>
    </div>
  );
};

export default React.memo(BaltraCategoryProducts);
