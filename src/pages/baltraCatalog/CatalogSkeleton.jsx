import React from "react";

const CatalogSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-start items-center gap-4 animate-pulse"
        >
          {/* Skeleton for image */}
          <div className="h-[350px] w-full bg-gray-300 shadow-lg shadow-gray-400 p-2 rounded"></div>

          {/* Skeleton for text */}
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

          {/* Skeleton for buttons */}
          <div className="flex flex-col justify-start items-center gap-3 w-full">
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogSkeleton;
