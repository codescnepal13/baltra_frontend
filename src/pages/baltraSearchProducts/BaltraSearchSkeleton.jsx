import React from "react";

const BaltraSearchSkeleton = () => {
  return (
    <div className="relative w-full sm:w-[293px] h-auto sm:h-[454px] border border-[#E4E4E4] bg-white animate-pulse">
      <div className="absolute w-[180px] h-[175px] left-1/2 transform -translate-x-1/2 top-8 sm:top-[30.31px] bg-gray-200 rounded"></div>

      <div className="absolute w-full border-t border-[#E4E4E4] top-[265.32px] sm:top-[265.32px]"></div>

      <div className="absolute left-4 sm:left-[23px] top-[290.32px] bg-gray-200 h-4 w-[80px] rounded"></div>

      <div className="absolute left-4 sm:left-[23px] top-[324.32px] space-y-2">
        <div className="bg-gray-200 h-4 w-[120px] rounded"></div>
        <div className="bg-gray-200 h-4 w-[140px] rounded"></div>
        <div className="bg-gray-200 h-4 w-[100px] rounded"></div>
        <div className="bg-gray-200 h-4 w-[110px] rounded"></div>
      </div>
    </div>
  );
};

export default BaltraSearchSkeleton;
