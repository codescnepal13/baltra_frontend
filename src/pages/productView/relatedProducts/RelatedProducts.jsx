import React, { useMemo } from "react";
import RelatedProductCard from "./RelatedProductCard";
import RelatedProductSkeleton from "./RelatedProductSkeleton/RelatedProductSkeleton";

const RelatedProducts = ({ allRelatedProducts, isFetching }) => {
  const relatedProductCards = useMemo(
    () =>
      allRelatedProducts?.map((item) => (
        <RelatedProductCard key={item.id} item={item} />
      )),
    [allRelatedProducts]
  );

  // Memoize the list of skeleton loaders
  const skeletonLoaders = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => (
        <RelatedProductSkeleton key={index} />
      )),
    []
  );

  return (
    <div className="my-10">
      <div className="text-center text-[#101623] text-3xl font-semibold capitalize leading-[52px] font-gothamNarrow">
        Related products
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 px-4 sm:px-0 mt-5">
        {isFetching ? (
          skeletonLoaders
        ) : allRelatedProducts?.length > 0 ? (
          relatedProductCards
        ) : (
          <span>No Data Found</span>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
