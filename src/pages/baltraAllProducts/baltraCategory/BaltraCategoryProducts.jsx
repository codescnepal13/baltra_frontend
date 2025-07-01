import React, { useEffect, useCallback, useMemo } from "react";
import BaltraCard from "./BaltraCard";
import { useDispatch, useSelector } from "react-redux";
import {
  baltraCategoryProducts,
  clearProductError,
} from "../../../redux/features/product/productSlice";
import CategorySkeleton from "./categorySkeleton/CategorySkeleton";

const BaltraCategoryProducts = () => {
  const { loading, error, categoryProducts } = useSelector(
    (state) => state.product
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

  const renderSkeletons = useCallback((length) => {
    return Array.from({ length }).map((_, index) => (
      <CategorySkeleton key={index} />
    ));
  }, []);

  const productCards = useMemo(
    () =>
      categoryProducts && categoryProducts.length > 0 ? (
        categoryProducts.map((item, index) => (
          <BaltraCard key={item.id} item={item} index={index} />
        ))
      ) : (
        <span className="text-center font-semibold">No Data Found</span>
      ),
    [categoryProducts]
  );

  return (
    <div className="container mx-auto px-4 lg:px-14 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 justify-center">
        {loading ? renderSkeletons(7) : productCards}
      </div>
    </div>
  );
};

export default BaltraCategoryProducts;
