import React from "react";
import MileStoneImg from "../../../assets/images/MileStoneImage.png";
import HomeApplianceCard from "./homeApplianceCard/HomeApplianceCard";

const BaltraCompetenCies = () => {
  return (
    <>
      <div className="relative w-full min-h-screen flex flex-col justify-between">
        {/* Background Image as Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${MileStoneImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Milestone Content */}
        <div className="relative lg:z-20 flex flex-col items-center my-12 lg:my-16">
          <div className="text-[#202D31] text-3xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow mb-2">
            Core Competencies
          </div>

          <div className="text-[#000000] text-lg sm:text-xl md:text-2xl font-normal font-gothamNarrow tracking-normal leading-6 text-center">
            Mastering Home Appliance ExCellence
          </div>
        </div>

        {/* Timeline */}
        <div className="relative lg:z-20 mt-0 lg:mt-8">
          <HomeApplianceCard />
        </div>
      </div>
    </>
  );
};

export default BaltraCompetenCies;
