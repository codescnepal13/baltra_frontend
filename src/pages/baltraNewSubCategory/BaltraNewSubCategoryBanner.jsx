import React from "react";
import FanImg from "../../assets/images/FanImg.png";
import RiceCookerImg from "../../assets/images/RiceCookerImg.png";
import TopHeader from "../../components/topHeader/TopHeader";

const BaltraNewSubCategoryBanner = ({ categoryInfo }) => {
  const title = categoryInfo?.category_name || "What are You Looking for?";
  const desc =
    categoryInfo?.desc || "Empower Your Home, Elevate Your Lifestyle!";
  const bannerImage = categoryInfo?.category_banner;

  return (
    <>
      {/* Hero banner */}
      <div
        className="relative w-full bg-gradient-to-r from-[#E91C1C] to-[#831010] bg-cover bg-center"
        style={
          bannerImage
            ? {
                backgroundImage: `linear-gradient(to right, rgba(233,28,28,0.85), rgba(131,16,16,0.85)), url(${bannerImage})`,
              }
            : undefined
        }
      >
        <div className="absolute top-0 left-0 w-full z-10">
          <TopHeader />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-14 h-auto md:h-[258px] px-4 sm:px-8 lg:px-16 2xl:px-24 pb-6 md:pb-0">
          <img
            src={RiceCookerImg}
            alt=""
            aria-hidden="true"
            className="w-[60px] h-[60px] xs:w-[80px] xs:h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[230px] lg:h-[170px] object-contain flex-shrink-0"
          />
          <div className="text-white text-center my-3 md:my-0 px-2">
            <div className="text-base xs:text-lg sm:text-xl lg:text-3xl 2xl:text-4xl font-medium font-gothamNarrow tracking-wide leading-snug">
              {title}
            </div>
            <div className="text-xs xs:text-sm lg:text-base 2xl:text-lg font-gothamNarrow tracking-wide mt-2">
              {desc}
            </div>
          </div>
          <img
            src={FanImg}
            alt=""
            aria-hidden="true"
            className="w-[60px] h-[60px] xs:w-[80px] xs:h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[190px] object-contain flex-shrink-0"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(BaltraNewSubCategoryBanner);
