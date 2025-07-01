import React from "react";
import ProcessImg from "../../../../assets/images/processImg.png";
import TimeImg from "../../../../assets/images/timeImg.png";
import ServiceImg from "../../../../assets/images/serviceImg.png";
import CostImg from "../../../../assets/images/costImg.png";
import QualityImg from "../../../../assets/images/qualityImg.png";
import InnovationImg from "../../../../assets/images/Innovation.png";

const HomeApplianceCard = () => {
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 max-w-screen-xl">
          {/** Card Component */}
          <div className="w-full max-w-sm h-auto px-6 py-8 bg-white bg-opacity-20 border border-gray-300 backdrop-blur-lg flex flex-col justify-center items-center gap-4 md:gap-6 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105">
            <img
              className="w-20 h-20 md:w-28 md:h-28"
              src={ProcessImg}
              alt="Process"
            />
            <div className="text-center text-black text-base md:text-xl font-bold font-gothamNarrow">
              Process
            </div>
            <div className="w-full text-center text-gray-800 text-sm md:text-lg font-light">
              We adhere to strict, well-engineered processes.
            </div>
          </div>

          <div className="w-full max-w-sm h-auto px-6 py-8 bg-white bg-opacity-20 border border-gray-300 backdrop-blur-lg flex flex-col justify-center items-center gap-4 md:gap-6 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105">
            <img
              className="w-20 h-20 md:w-28 md:h-28"
              src={TimeImg}
              alt="Time"
            />
            <div className="text-center text-black text-base md:text-xl font-bold font-gothamNarrow">
              Time
            </div>
            <div className="w-full text-center text-gray-800 text-sm md:text-lg font-light">
              We ensure on-time delivery for customer demands.
            </div>
          </div>

          <div className="w-full max-w-sm h-auto px-6 py-8 bg-white bg-opacity-20 border border-gray-300 backdrop-blur-lg flex flex-col justify-center items-center gap-4 md:gap-6 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105">
            <img
              className="w-20 h-20 md:w-28 md:h-28"
              src={ServiceImg}
              alt="Service"
            />
            <div className="text-center text-black text-base md:text-xl font-bold font-gothamNarrow">
              Service
            </div>
            <div className="w-full text-center text-gray-800 text-sm md:text-lg font-light">
              Our professional team is dedicated to exceptional customer
              service.
            </div>
          </div>

          <div className="w-full max-w-sm h-auto px-6 py-8 bg-white bg-opacity-20 border border-gray-300 backdrop-blur-lg flex flex-col justify-center items-center gap-4 md:gap-6 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105">
            <img
              className="w-20 h-20 md:w-28 md:h-28"
              src={CostImg}
              alt="Cost"
            />
            <div className="text-center text-black text-base md:text-xl font-bold font-gothamNarrow">
              Cost
            </div>
            <div className="w-full text-center text-gray-800 text-sm md:text-lg font-light">
              We prioritize cost control by optimizing supply chain resources.
            </div>
          </div>

          <div className="w-full max-w-sm h-auto px-6 py-8 bg-white bg-opacity-20 border border-gray-300 backdrop-blur-lg flex flex-col justify-center items-center gap-4 md:gap-6 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105">
            <img
              className="w-20 h-20 md:w-28 md:h-28"
              src={QualityImg}
              alt="Quality"
            />
            <div className="text-center text-black text-base md:text-xl font-bold font-gothamNarrow">
              Quality
            </div>
            <div className="w-full text-center text-gray-800 text-sm md:text-lg font-light">
              Our commitment is to deliver reliable quality.
            </div>
          </div>

          <div className="w-full max-w-sm h-auto px-6 py-8 bg-white bg-opacity-20 border border-gray-300 backdrop-blur-lg flex flex-col justify-center items-center gap-4 md:gap-6 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105">
            <img
              className="w-20 h-20 md:w-28 md:h-28"
              src={InnovationImg}
              alt="Innovation"
            />
            <div className="text-center text-black text-base md:text-xl font-bold font-gothamNarrow">
              Innovation
            </div>
            <div className="w-full text-center text-gray-800 text-sm md:text-lg font-light">
              We foster management and technical innovation to stay ahead in the
              industry.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeApplianceCard;
