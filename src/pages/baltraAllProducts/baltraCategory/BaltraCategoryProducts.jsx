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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
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
      custom={(index % 8) * 0.06}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="h-full"
    >
      <Link
        to={`/baltra-newsubcategory/${item.id}`}
        title={descriptor}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
          <img
            src={item.image_url}
            alt={descriptor}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col items-start gap-1.5 p-2 xs:p-2.5 sm:gap-2 sm:p-3.5">
          <h3 className="line-clamp-2 w-full min-h-[2.2em] font-gothamNarrow text-[11px] leading-tight font-semibold text-neutral-800 xs:text-xs sm:text-sm lg:text-base">
            {item.name}
          </h3>
          <span className="mt-auto inline-flex w-full items-center justify-center rounded-md bg-red-600 px-2 py-1.5 text-[10px] font-semibold text-white transition-colors font-gothamNarrow group-hover:bg-red-700 xs:text-[11px] sm:px-4 sm:py-2 sm:text-xs lg:text-sm">
            Explore
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
    Array.from({ length }).map((_, index) => <CategorySkeleton key={index} />);

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

  const productCards = useMemo(() => {
    if (!categoryProducts || categoryProducts.length === 0) {
      return (
        <span className="col-span-full text-center font-semibold py-8">
          No Data Found
        </span>
      );
    }

    return categoryProducts.map((item, index) => (
      <BaltraCategoryCard key={item.id} item={item} index={index} />
    ));
  }, [categoryProducts]);

  return (
    <div className="container mx-auto px-3 py-5 sm:px-4 sm:py-6 lg:px-14">
      {itemListSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(itemListSchema)}
          </script>
        </Helmet>
      )}

      <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6">
        {loading ? renderSkeletons(8) : productCards}
      </div>
    </div>
  );
};

export default React.memo(BaltraCategoryProducts);
