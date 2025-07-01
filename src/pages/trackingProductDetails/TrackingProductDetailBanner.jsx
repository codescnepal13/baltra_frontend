import React from "react";
import BaltraApplianceCareHeader from "../baltraTracking/baltraApplianceCare/BaltraApplianceCareHeader";
import trackingImg from "../../assets/images/trackingserviceImg.png";
import sessionImg from "../../assets/images/SessiorImg.png";

const TrackingProductDetailBanner = () => {
  return (
    <>
      <div className="pt-4 w-full bg-gradient-to-r from-[#E91C1C] to-[#831010] bg-opacity-60">
        <BaltraApplianceCareHeader />

        <div className="flex justify-between items-center h-[278px] px-4 sm:px-8 lg:px-16 2xl:px-24">
          {/* Hide on small screens */}
          <img
            src={trackingImg}
            alt="Rice Cooker"
            className="w-56 h-56 hidden sm:block"
          />
          <div className="text-white text-center flex-grow">
            <div className="text-xl lg:text-3xl 2xl:text-4xl font-semibold font-gothamNarrow tracking-wide">
              Track Your Product
            </div>
            <div className="text-xs lg:text-sm 2xl:text-base font-gothamNarrow tracking-wider my-2">
              Know the status of your Products
            </div>
          </div>
          {/* Hide on small screens */}
          <img
            src={sessionImg}
            alt="Fan"
            className="w-56 h-56 hidden sm:block"
          />
        </div>
      </div>
    </>
  );
};

export default TrackingProductDetailBanner;
