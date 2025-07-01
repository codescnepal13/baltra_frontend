import React from "react";

const BaltraCategorySkeleton = () => {
  return (
    <div className="p-4 bg-gray-200/10 rounded-sm border border-slate-300 flex flex-col justify-start items-center gap-6 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded"></div>
      <div className="w-3/4 h-6 bg-gray-300 rounded mt-4"></div>
    </div>
  );
};

export default BaltraCategorySkeleton;
