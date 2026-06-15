import FanImg from "../../../assets/images/FanImg.png";
import RiceCookerImg from "../../../assets/images/RiceCookerImg.png";
import BaltraApplianceCareHeader from "../../baltraTracking/baltraApplianceCare/BaltraApplianceCareHeader";

const BalltraExtendWarrantyBanner = () => {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#E91C1C] to-[#831010] bg-opacity-60 relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <BaltraApplianceCareHeader />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[268px] px-4 sm:px-8 lg:px-16 2xl:px-24 pt-16">
          <img
            src={RiceCookerImg}
            alt="Rice Cooker"
            className="w-24 sm:w-36 lg:w-48 h-auto mb-4 md:mb-0"
          />
          <div className="text-white text-center mb-4 md:mb-0">
            <div className="text-lg sm:text-2xl lg:text-4xl 2xl:text-5xl font-normal font-gothamNarrow">
              Extended Warranty
            </div>
            <div className="text-sm lg:text-xl font-gothamNarrow">
              Get extended warranty for your products
            </div>
          </div>
          <img src={FanImg} alt="Fan" className="w-20 sm:w-28 lg:w-32 h-auto" />
        </div>
      </div>
    </>
  );
};

export default BalltraExtendWarrantyBanner;
