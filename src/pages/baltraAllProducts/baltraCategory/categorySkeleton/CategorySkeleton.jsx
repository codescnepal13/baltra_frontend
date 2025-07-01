import React from "react";

const CategorySkeleton = () => {
  return (
    <>
      <div className="p-4 bg-gray-200/10 rounded-lg border-slate-300 flex flex-col justify-start items-center gap-4 animate-pulse">
        <div className="w-full h-40 bg-gray-300 rounded-md"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-2/4 h-4 bg-gray-300 rounded-md"></div>
      </div>
    </>
  );
};

export default CategorySkeleton;
