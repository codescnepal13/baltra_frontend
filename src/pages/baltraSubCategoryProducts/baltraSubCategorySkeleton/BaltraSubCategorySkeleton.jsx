import React from "react";

const BaltraSubCategorySkeleton = () => {
  return (
    <div>
      <div className="w-full h-[380px] md:h-[480px] lg:h-[580px] flex justify-center items-center bg-gray-300 animate-pulse">
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="w-full h-8 md:h-10 lg:h-12 bg-gray-200"></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1.5">
          <div className="text-center text-white text-2xl md:text-4xl lg:text-5xl font-semibold font-gothamNarrow bg-gray-400 w-3/4 md:w-2/3 lg:w-1/2 h-8 md:h-10 lg:h-12 mb-4"></div>
          <h4 className="text-center text-white text-sm md:text-base lg:text-lg font-gothamNarrow bg-gray-400 w-1/2 md:w-1/3 h-4 md:h-5 lg:h-6"></h4>
        </div>
      </div>
      <div className="bg-gray-50 px-4 md:px-16 lg:px-28">
        <div className="bg-white py-4 md:py-6 lg:py-8 px-2 relative md:-top-16 lg:-top-24">
          <div className="container mx-auto relative">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold font-gothamNarrow text-center mb-4 bg-gray-200 w-1/2 md:w-1/3 lg:w-1/4 h-6 md:h-7 lg:h-8 mx-auto"></h2>
            <div className="ml-2 absolute top-4 left-2 bg-gray-200 w-6 h-6 md:w-8 md:h-8 rounded-full"></div>
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10 bg-gray-200 w-8 h-8 md:w-10 md:h-10 rounded-full"></button>
            <div className="flex overflow-x-scroll scrollbar-hide">
              {/* Skeleton items */}
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex-none w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/7 px-2 md:px-4 lg:px-6"
                >
                  <div className="w-full h-20 md:h-28 lg:h-32 bg-gray-200 animate-pulse"></div>
                </div>
              ))}
            </div>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-10 bg-gray-200 w-8 h-8 md:w-10 md:h-10 rounded-full"></button>
          </div>
          <div className="px-4 py-6 md:py-8">
            {/* Skeleton for product list */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full h-16 md:h-20 lg:h-24 bg-gray-200 mb-3 md:mb-4 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaltraSubCategorySkeleton;
