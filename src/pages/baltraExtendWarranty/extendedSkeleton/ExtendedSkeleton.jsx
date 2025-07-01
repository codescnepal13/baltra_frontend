import React from "react";

const ExtendedSkeleton = () => {
  return (
    <div className="min-h-screen py-10 px-4 lg:px-52 animate-pulse">
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-300 rounded w-4"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start gap-x-14">
        <div className="my-8">
          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-64"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start p-2 border border-gray-200 gap-4">
          <div className="w-36 h-36 md:w-[147px] md:h-[144px] bg-gray-300 rounded"></div>
          <div className="flex flex-col md:ml-2 my-5 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-36"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="flex flex-col justify-start items-start gap-3 ml-4 mt-4">
            <div className="h-4 bg-gray-300 rounded w-40"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-36"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-8 mt-10">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border-2 rounded-sm p-8 w-full sm:w-80 my-5 border-gray-200 animate-pulse"
          >
            <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-32 mb-10"></div>

            <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
            <ul className="list-none mt-2 space-y-2">
              {[...Array(3)].map((_, idx) => (
                <li key={idx} className="flex text-sm items-center">
                  <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </li>
              ))}
            </ul>

            <div className="mt-16 space-y-4">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtendedSkeleton;
