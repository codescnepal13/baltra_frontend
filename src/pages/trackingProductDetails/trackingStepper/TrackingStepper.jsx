import moment from "moment";
import React from "react";

const TrackingStepper = ({ trackingProduct }) => {
  if (!trackingProduct?.job_no) return null;

  return (
    <div className="relative py-4 w-full">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center w-max px-4 space-x-4 sm:space-x-6">
          {trackingProduct?.stepper?.map((step, index) => (
            <div key={index} className="flex items-center">
              
              {index > 0 && (
                <div className="h-[2px] sm:h-[4px] w-8 sm:w-12 bg-red-500" />
              )}

            
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold text-white bg-red-500">
                  {index + 1}
                </div>
                <div className="text-[10px] sm:text-sm font-medium text-center mt-2 font-gothamNarrow">
                  {step?.newServiceStatusName}
                </div>
                <div className="text-[8px] sm:text-xs text-gray-500 mt-1 font-gothamNarrow">
                  {moment(step?.dateAdded).format("ddd, MMM D, YYYY")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingStepper;
