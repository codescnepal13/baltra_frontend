import sessionImg from "../../assets/images/SessiorImg.png";
import trackingImg from "../../assets/images/trackingserviceImg.png";
import BaltraApplianceCareHeader from "../baltraTracking/baltraApplianceCare/BaltraApplianceCareHeader";

const TrackingProductDetailBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#E91C1C] to-[#831010]">
      <BaltraApplianceCareHeader />

      {/* Fluid height via padding, not a fixed px height — never clips
          on small screens, never leaves excess empty space on large ones. */}
      <div className="relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-8 sm:justify-between sm:gap-6 sm:px-8 sm:py-10 md:py-12 lg:px-16 lg:py-14 2xl:px-24">
          {/* Left illustration — scales with viewport instead of a hard cutoff */}
          <img
            src={trackingImg}
            alt=""
            aria-hidden="true"
            className="hidden w-20 flex-shrink-0 object-contain sm:block sm:w-28 md:w-36 lg:w-48 2xl:w-56"
          />

          {/* Text block — always centered, never fights the illustrations for space */}
          <div className="min-w-0 flex-1 text-center text-white">
            <h1 className="font-gothamNarrow text-xl font-semibold tracking-wide sm:text-2xl md:text-3xl 2xl:text-4xl">
              Track Your Product
            </h1>
            <p className="mt-2 font-gothamNarrow text-xs tracking-wider text-white/85 sm:text-sm 2xl:text-base">
              Know the status of your products
            </p>
          </div>

          {/* Right illustration */}
          <img
            src={sessionImg}
            alt=""
            aria-hidden="true"
            className="hidden w-20 flex-shrink-0 object-contain sm:block sm:w-28 md:w-36 lg:w-48 2xl:w-56"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackingProductDetailBanner;
