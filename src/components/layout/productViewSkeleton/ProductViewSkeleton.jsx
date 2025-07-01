import React from "react";

const ProductViewSkeleton = () => {
  return (
    <>
      <div className="font-gothamNarrow container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-6 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/2 sm:w-1/3 md:w-1/4 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          {/* Left Side - Image */}
          <div className="mb-4 bg-white flex justify-center items-center flex-wrap">
            <div className="relative w-full h-64 sm:h-80 md:h-full mx-auto overflow-hidden mb-4 border border-gray-100 bg-gray-300 rounded-lg"></div>
          </div>

          {/* Right Side - Product Details */}
          <div className="sm:px-0 md:px-4 lg:px-8 space-y-4">
            {/* SKU */}
            <div className="h-4 bg-gray-300 rounded w-2/3 sm:w-1/2 md:w-1/3"></div>

            {/* Icons */}
            <div className="flex justify-end space-x-4">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Product Name */}
            <div className="h-8 bg-gray-300 rounded w-4/5 sm:w-3/4 md:w-2/3"></div>

            {/* Price */}
            <div className="h-6 bg-gray-300 rounded w-1/3 sm:w-1/4 mb-4"></div>
            <div className="h-1 bg-gray-300 rounded w-full"></div>

            {/* Size Fit */}
            <div className="h-4 bg-gray-300 rounded w-1/4 sm:w-1/6"></div>
            <div className="flex items-center flex-wrap justify-start gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
            </div>

            {/* Stock */}
            <div className="h-4 bg-gray-300 rounded w-1/2 sm:w-1/3"></div>

            {/* Color Selection */}
            <div className="h-4 bg-gray-300 rounded w-1/4 sm:w-1/6 mt-4"></div>
            <div className="flex items-center flex-wrap justify-start gap-4">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Quantity */}
            <div className="h-4 bg-gray-300 rounded w-1/4 sm:w-1/6 mt-4"></div>
            <div className="flex my-2">
              <div className="px-4 py-4 bg-gray-300 rounded-l"></div>
              <div className="w-12 h-12 bg-gray-300 text-center"></div>
              <div className="px-4 py-4 bg-gray-300 rounded-r"></div>
            </div>

            {/* Add to Cart Button */}
            <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-1 bg-gray-300 rounded w-full mt-8"></div>

            {/* Details, Material, Review */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-4">
                <div className="h-6 bg-gray-300 rounded w-1/4 sm:w-1/6"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4 sm:w-1/6"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4 sm:w-1/6"></div>
              </div>
              <div className="h-24 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductViewSkeleton;
