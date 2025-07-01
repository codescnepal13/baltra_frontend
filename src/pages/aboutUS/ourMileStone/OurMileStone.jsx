import React from "react";
import MileStoneImg from "../../../assets/images/MileStoneImage.png";
import TimeLine from "./TimeLine";

const OurMileStone = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#F6F8FA] flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${MileStoneImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative lg:z-20 text-center mx-auto px-4 my-12 sm:my-0">
        <div className="text-[#202D31] text-3xl sm:text-4xl lg:text-5xl font-bold font-gothamNarrow mb-4 lg:mb-2">
          Our Milestone
        </div>

        <div className="text-[#000000] text-lg sm:text-xl lg:text-2xl font-normal font-gothamNarrow tracking-normal leading-6 lg:leading-8">
          Charting Our Progress: Achieving Significant Milestones on Our Journey
        </div>
      </div>

      <div className="relative lg:z-20 w-full px-4 lg:mt-40">
        <div className="flex justify-center">
          <div className="overflow-hidden w-full">
            <TimeLine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMileStone;
