import React from "react";
import FanImg from "../../../assets/images/FanImg.png";
import RiceCookerImg from "../../../assets/images/RiceCookerImg.png";
import TopHeader from "../../../components/topHeader/TopHeader";

const AllProductsBanner = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-[#E91C1C] to-[#831010]">
      <div className="absolute top-0 left-0 w-full z-10">
        <TopHeader />
      </div>

      <div className="flex flex-row items-center justify-between gap-2 pt-16 pb-4 px-3 xs:px-5 sm:px-8 md:pt-14 md:pb-0 lg:px-16 2xl:px-24 md:h-[258px]">
        <img
          src={RiceCookerImg}
          alt="Rice Cooker"
          className="w-[48px] h-[48px] xs:w-[64px] xs:h-[64px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[120px] lg:w-[230px] lg:h-[170px] object-contain flex-shrink-0"
        />

        <div className="text-white text-center flex-1 min-w-0 px-1">
          <div className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-medium font-gothamNarrow tracking-wide leading-snug break-words">
            All Products
          </div>
          <div className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-base 2xl:text-lg font-gothamNarrow tracking-wide mt-1 sm:mt-2">
            Explore Our Complete Range of Home & Kitchen Appliances
          </div>
        </div>

        <img
          src={FanImg}
          alt="Fan"
          className="w-[48px] h-[48px] xs:w-[64px] xs:h-[64px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[150px] lg:w-[140px] lg:h-[190px] object-contain flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default React.memo(AllProductsBanner);
