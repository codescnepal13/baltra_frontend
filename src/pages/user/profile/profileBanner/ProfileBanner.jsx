import React from "react";
import FanImg from "../../../../assets/images/FanImg.png";
import RiceCookerImg from "../../../../assets/images/RiceCookerImg.png";
import TopHeader from "../../../../components/topHeader/TopHeader";

const ProfileBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#E91C1C] to-[#831010] bg-opacity-60 relative">
      <div className="absolute top-0 left-0 w-full z-10">
        <TopHeader />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[268px] px-4 sm:px-8 lg:px-16 2xl:px-24 pt-16">
        <img
          src={RiceCookerImg}
          alt="Rice Cooker"
          className="w-24 sm:w-36 lg:w-48 h-auto mb-4 md:mb-0"
        />
        <div className="text-white text-center mb-4 md:mb-0">
          <div className="text-lg sm:text-2xl lg:text-4xl 2xl:text-5xl font-normal font-gothamNarrow">
            Account Dashboard
          </div>
          <div className="text-sm sm:text-lg lg:text-xl 2xl:text-2xl font-gothamNarrow">
            Manage your profile and account settings
          </div>
        </div>
        <img src={FanImg} alt="Fan" className="w-20 sm:w-28 lg:w-32 h-auto" />
      </div>
    </div>
  );
};

export default React.memo(ProfileBanner);
