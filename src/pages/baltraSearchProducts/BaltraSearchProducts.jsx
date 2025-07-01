import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProductsBanner from "../baltraAllProducts/allProductsBanner/AllProductsBanner";
import MetaData from "../../components/layout/metaData/MetaData";
import BaltraSearchCard from "./BaltraSearchCard";
import { FaTh, FaThList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  baltraSearchProducts,
  clearProductError,
} from "../../redux/features/product/productSlice";
import BaltraSearchSkeleton from "./BaltraSearchSkeleton";

const BaltraSearchProducts = () => {
  const { isProcessing, error, baltraSearchProductsList } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const query = location.state?.query || {};

  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(
      baltraSearchProducts({
        product_name: query.product_name,
        sort_order: sortOrder,
      })
    );
  }, [dispatch, query.product_name, sortOrder]);

  useEffect(() => {
    if (error) {
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  const handleViewChange = (viewMode) => {
    setView(viewMode);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <>
      <MetaData title="Baltra Search Products" />
      <AllProductsBanner />
      <div className="px-24">
        <div className="flex flex-wrap justify-end items-center mb-4 gap-2">
          <div className="flex items-center gap-2">
            <select
              type="text"
              id="sort"
              name="sort"
              className="px-6 py-2 border border-gray-300 rounded-sm focus:outline-none text-gray-900 text-sm focus:border-red-600 font-gothamNarrow accent-red-600"
              onChange={handleSortChange}
            >
              <option value="featured" className="accent-red-600">
                Sort By Featured
              </option>
              <option value="all" className="accent-red-600">
                All
              </option>
              <option value="asc" className="accent-red-600">
                Low to High
              </option>
              <option value="desc" className="accent-red-600">
                High to Low
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-sm cursor-pointer ${
                view === "grid" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleViewChange("grid")}
            >
              <FaTh
                className={`text-${view === "grid" ? "gray-900" : "gray-400"}`}
              />
            </div>
            <div
              className={`p-2 rounded-sm cursor-pointer ${
                view === "list" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleViewChange("list")}
            >
              <FaThList
                className={`text-${view === "list" ? "gray-900" : "gray-400"}`}
              />
            </div>
          </div>
        </div>

        {isProcessing ? (
          <BaltraSearchSkeleton />
        ) : (
          <>
            <div
              className={`${
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  : "flex flex-col gap-4"
              }`}
            >
              {baltraSearchProductsList &&
              baltraSearchProductsList.length > 0 ? (
                baltraSearchProductsList.map((item) => (
                  <BaltraSearchCard key={item.id} item={item} view={view} />
                ))
              ) : (
                <span>No data Found</span>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BaltraSearchProducts;
