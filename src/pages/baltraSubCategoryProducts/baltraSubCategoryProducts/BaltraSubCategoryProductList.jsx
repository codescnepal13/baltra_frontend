import React, { useState } from "react";
import BaltraSubCategoryProductCard from "./BaltraSubCategoryProductCard";
import { FaTh, FaThList } from "react-icons/fa";
import BaltraSubCategorySkeleton from "../baltraSubCategorySkeleton/BaltraSubCategorySkeleton";

const BaltraSubCategoryProductList = ({ products, isLoading }) => {
  const [view, setView] = useState("grid");

  const handleViewChange = (viewMode) => {
    setView(viewMode);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4 gap-2">
        <div className="flex items-center">
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
      {isLoading ? (
        <BaltraSubCategorySkeleton />
      ) : (
        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8"
              : "flex flex-col gap-4"
          }`}
        >
          {products && products.length > 0 ? (
            products.map((item) => (
              <BaltraSubCategoryProductCard
                key={item.id}
                item={item}
                view={view}
              />
            ))
          ) : (
            <span>No data found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default BaltraSubCategoryProductList;
