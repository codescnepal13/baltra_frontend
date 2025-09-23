import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import baltraBoyImg from "../../../assets/images/baltraBoyImg.png";
import rewardMedalImg from "../../../assets/images/rewardMedalImg.png";
import UserProductBannerImg from "../../../assets/images/userProductBannerImg.png";
import {
  addRedeemPoint,
  clearProductError,
} from "../../../redux/features/product/productSlice";
import UserProductHeader from "../../userProductPage/userProductHeader/UserProductHeader";

const BaltraRewardBanner = ({
  rewardPointValue,
  stock_details,
  warranty_details,
}) => {
  const { isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { reward_points } = rewardPointValue || {};

  const handleRedeemPoint = (e) => {
    e.preventDefault();
    const data = {
      stock_id: stock_details.id,
      price: warranty_details.price,
      duration: warranty_details.duration,
    };
    dispatch(addRedeemPoint({ data, enqueueSnackbar }));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      dispatch(clearProductError());
    }
  }, [dispatch, error]);
  return (
    <>
      <div
        className="relative min-h-[70vh] lg:h-[75vh] xl:h-[80vh] bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(103deg, #8E0E0E 5.93%, #BB0707 101.25%), url(${UserProductBannerImg})`,
          backgroundBlendMode: "hard-light",
        }}
      >
        <div>
          <UserProductHeader />
        </div>

        <div className="absolute inset-0 flex flex-col lg:flex-row items-center lg:justify-between px-4 sm:px-8 lg:px-36 mt-5 lg:mt-10 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="flex flex-col mt-14 sm:mt-8">
            <span className="text-white text-lg sm:text-2xl font-semibold tracking-wide leading-tight font-gothamNarrow">
              Welcome to
              <br />
            </span>
            <span className="text-white text-2xl sm:text-4xl font-semibold font-gothamNarrow">
              BALTRA'S LOYALTY PAGE
            </span>

            <img
              className="hidden md:block mt-2 w-40 sm:w-60 md:w-72 lg:w-80 h-auto"
              src={baltraBoyImg}
              alt="Product"
            />
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="border-e border-t border-s p-4 rounded-md bg-white bg-opacity-5 border-white backdrop-blur-sm">
              <div className="flex items-center">
                <img className="w-28 h-28" src={rewardMedalImg} alt="medal" />
                <div className="text-white text-5xl sm:text-7xl font-bold uppercase leading-none text-center font-gothamNarrow">
                  {reward_points} POINTS
                </div>
              </div>
              <div className="text-white text-2xl sm:text-4xl uppercase leading-none text-center font-gothamNarrow">
                AVAILABLE POINTS
              </div>
              <button
                className="relative mt-2 w-4/5 ml-12 h-12 sm:h-16 bg-gradient-to-r from-[#DD1111] to-[#F5280C] shadow-md flex items-center justify-center text-white text-sm sm:text-lg font-gothamNarrow transition duration-300 hover:bg-hover-gradient hover:shadow-custom-hover"
                type="submit"
                disabled={isLoading}
                onClick={handleRedeemPoint}
              >
                {isLoading && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </span>
                )}
                REDEEM WARRANTY
                <div className="relative ml-4 w-4 h-4 sm:w-6 sm:h-6">
                  <FaArrowRight />
                </div>
              </button>
              <div className="mt-4 sm:mt-8 text-white text-sm lg:text-lg leading-wider text-center font-gothamNarrow">
                Redeem these points to extend your warranty on your products.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaltraRewardBanner;
