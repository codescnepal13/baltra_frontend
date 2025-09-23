import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import BaltraCategoryBasedCard from "./BaltraCategoryBasedCard";
import BaltraCategorySkeleton from "./baltraCategorySkeleton/BaltraCategorySkeleton";

const BaltraCategoryBased = () => {
  const { loading, categoryInfo, allKitchenProducts } = useSelector(
    (state) => state.product
  );
  const { name } = categoryInfo || {};

  const renderSkeletons = useCallback((length) => {
    return Array.from({ length }).map((_, index) => (
      <BaltraCategorySkeleton key={index} />
    ));
  }, []);

  const productKitchenCards = useMemo(
    () =>
      allKitchenProducts && allKitchenProducts.length > 0 ? (
        allKitchenProducts.map((item, index) => (
          <BaltraCategoryBasedCard key={item.id} item={item} index={index} />
        ))
      ) : (
        <span className="text-center font-semibold">No Data Found</span>
      ),
    [allKitchenProducts]
  );

  return (
    <>
      <div className="container mx-auto px-8 p-4">
        <h2 className="text-center text-2xl font-semibold mb-4 font-gothamNarrow tracking-normal">
          {name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {loading ? renderSkeletons(10) : productKitchenCards}
        </div>
      </div>
    </>
  );
};

export default React.memo(BaltraCategoryBased);
