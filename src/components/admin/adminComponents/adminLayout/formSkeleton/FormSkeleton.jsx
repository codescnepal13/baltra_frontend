import React from "react";

const FormSkeleton = () => {
  return (
    <>
      <div className="animate-pulse space-y-6">
        {/* Top input field */}
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        </div>

        {/* Grid layout for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Large input field */}
        <div className="mt-8">
          <div className="h-16 bg-gray-200 rounded-md w-full"></div>
          <div className="flex space-x-4 mt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-32 bg-gray-200 rounded-md flex-grow"
              ></div>
            ))}
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center mt-6">
          <div className="h-4 w-4 bg-gray-200 rounded-full animate-ping"></div>
          <span className="ml-2 text-gray-400">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default FormSkeleton;
