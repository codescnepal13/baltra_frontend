import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import BaltraCategoryBasedCard from "./BaltraCategoryBasedCard";
import BaltraCategorySkeleton from "./baltraCategorySkeleton/BaltraCategorySkeleton";

const BaltraCategoryBased = ({ searchState }) => {
  const {
    loading,
    isProcessing, // baltraSearchProducts uses isProcessing
    categoryInfo,
    allKitchenProducts,
    baltraSearchProductsList, // ← the real Redux key from your slice
  } = useSelector((state) => state.product);

  const { name } = categoryInfo || {};
  const isSearchActive = searchState?.isActive;

  // Pick data source and loading flag based on mode
  const products = isSearchActive
    ? baltraSearchProductsList
    : allKitchenProducts;
  const isLoading = isSearchActive ? isProcessing : loading;

  const renderSkeletons = useCallback(
    (length) =>
      Array.from({ length }).map((_, i) => <BaltraCategorySkeleton key={i} />),
    [],
  );

  const productCards = useMemo(() => {
    if (products && products.length > 0) {
      return products.map((item, index) => (
        <BaltraCategoryBasedCard key={item.id} item={item} index={index} />
      ));
    }
    if (isSearchActive) {
      return (
        <div className="col-span-full flex flex-col items-center py-16 text-gray-400">
          <span className="text-4xl mb-3">🔍</span>
          <p className="font-semibold font-gothamNarrow text-lg">
            No products found
          </p>
          <p className="text-sm mt-1">
            Try a different name or remove the filter
          </p>
        </div>
      );
    }
    return (
      <span className="col-span-full text-center font-semibold">
        No Data Found
      </span>
    );
  }, [products, isSearchActive]);

  return (
    <div className="container mx-auto px-8 p-4">
      <h2 className="text-center text-2xl font-semibold mb-4 font-gothamNarrow tracking-normal">
        {isSearchActive
          ? searchState.filter
            ? `Results in "${searchState.filter}"`
            : "Search Results"
          : name}
      </h2>

      {isSearchActive && !isProcessing && products?.length > 0 && (
        <p className="text-center text-sm text-gray-500 -mt-2 mb-4 font-gothamNarrow">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {isLoading ? renderSkeletons(10) : productCards}
      </div>
    </div>
  );
};

export default React.memo(BaltraCategoryBased);
