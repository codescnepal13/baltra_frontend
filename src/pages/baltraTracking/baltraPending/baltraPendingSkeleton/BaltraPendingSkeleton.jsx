import React from "react";

const BaltraPendingSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-md border border-gray-300 flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
      <div className="w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gray-200 animate-pulse rounded"></div>

      <div className="flex flex-col w-full py-2">
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex items-center" key={index}>
              <div className="w-40 sm:w-1/2 md:w-1/3 lg:w-1/4 h-4 bg-gray-200 animate-pulse rounded"></div>

              <div className="flex-1 h-4 bg-gray-200 animate-pulse rounded ml-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaltraPendingSkeleton;
