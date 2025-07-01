import React from "react";
import { GoTrash } from "react-icons/go";

const CustomerAddSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 py-4">
      {Array(6)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="relative w-full border border-gray-200 p-4 sm:p-6 rounded-sm flex flex-col animate-pulse"
          >
            <div className="absolute top-2 right-2 w-8 h-8 p-1 bg-gray-200 rounded-full flex justify-center items-center">
              <GoTrash className="text-gray-300" />
            </div>
            <div className="w-full flex justify-center mt-4 sm:mt-6">
              <div className="w-40 h-40 sm:w-56 sm:h-56 bg-gray-200 rounded-md"></div>
            </div>
            <div className="mt-4 sm:mt-8 space-y-2 flex-1 font-gothamNarrow">
              <div className="flex justify-between text-[#4A4A4A] font-normal">
                <span className="bg-gray-200 w-24 h-4 rounded-sm"></span>
                <span className="bg-gray-300 w-16 h-4 rounded-sm"></span>
              </div>
              <div className="flex justify-between text-[#4A4A4A] font-normal">
                <span className="bg-gray-200 w-24 h-4 rounded-sm"></span>
                <span className="bg-gray-300 w-16 h-4 rounded-sm"></span>
              </div>
              <div className="flex justify-between text-[#4A4A4A] font-normal">
                <span className="bg-gray-200 w-24 h-4 rounded-sm"></span>
                <span className="bg-gray-300 w-16 h-4 rounded-sm"></span>
              </div>
              <div className="flex justify-between text-[#4A4A4A] font-normal">
                <span className="bg-gray-200 w-24 h-4 rounded-sm"></span>
                <span className="bg-gray-300 w-16 h-4 rounded-sm"></span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:gap-4">
              <div className="w-full p-2 sm:p-4 bg-gray-200 rounded-sm"></div>
              <div className="w-full p-2 sm:p-4 bg-gray-200 rounded-sm"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CustomerAddSkeleton;
