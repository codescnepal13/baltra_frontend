import React from "react";

const RelatedProductSkeleton = () => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md p-4 my-4 mx-auto sm:mx-0">
      <div className="flex justify-center items-center w-full h-48 mb-4 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="border-t border-gray-300 mt-4 pt-4">
        <div className="text-gray-400 text-sm font-medium bg-gray-200 h-4 w-3/4 rounded animate-pulse mb-4"></div>
        <div className="space-y-2">
          <div className="bg-gray-200 h-4 w-full rounded animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-11/12 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-10/12 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-9/12 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductSkeleton;
