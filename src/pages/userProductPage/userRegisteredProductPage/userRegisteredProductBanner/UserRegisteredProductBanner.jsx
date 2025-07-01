import React, { useState } from "react";
import UserAddProductModal from "../../userAddProductModal/UserAddProductModal";
import { FaArrowRight } from "react-icons/fa";
import UserProductHeader from "../../userProductHeader/UserProductHeader";
import UserProductBannerImg from "../../../../assets/images/userProductBannerImg.png";
import userNewStarImage from "../../../../assets/images/userImageInStar.png";
import userCartImg from "../../../../assets/images/cartBagImg.png";

const UserRegisteredProductBanner = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div
        className="relative h-[80vh] bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(103deg, #8E0E0E 5.93%, #BB0707 101.25%), url(${UserProductBannerImg})`,
          backgroundBlendMode: "hard-light",
        }}
      >
        <div>
          <UserProductHeader />
        </div>

        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 lg:px-24 mt-8 lg:mt-24 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-white text-lg sm:text-2xl font-semibold tracking-wide leading-tight font-gothamNarrow">
              Welcome to
              <br />
            </span>
            <span className="text-white text-2xl sm:text-4xl font-semibold font-gothamNarrow">
              REGISTERED PRODUCT’S PAGE
            </span>
            {/* <img
              className="w-40 h-40 sm:w-60 sm:h-60 lg:w-[430px] lg:h-[310px] max-w-full max-h-full hidden md:block"
              src={userNewStarImage}
              alt="Product"
            /> */}
            <img
              className="hidden md:block mt-4 w-40 h-40 sm:w-60 sm:h-60 lg:w-[430px] lg:h-[310px]"
              src={userNewStarImage}
              alt="Product"
            />
          </div>
          <div className="flex flex-col items-center p-4 sm:p-8 bg-white bg-opacity-5 rounded-lg border border-white backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <img
                className="w-10 h-10 sm:w-14 sm:h-14"
                src={userCartImg}
                alt="Icon"
              />
              <div className="text-white text-3xl sm:text-5xl font-bold uppercase leading-none text-center font-gothamNarrow">
                ADD PRODUCTS
              </div>
            </div>
            <button
              className="mt-4 sm:mt-8 w-full h-12 sm:h-[71px] bg-gradient-to-r from-[#DD1111] to-[#F5280C] shadow-md flex items-center justify-center gap-4 text-white text-sm sm:text-lg font-gothamNarrow transition duration-300 hover:bg-hover-gradient hover:shadow-custom-hover"
              type="submit"
              onClick={handleClick}
            >
              REGISTER A PRODUCT
              <div className="relative w-6 h-6 sm:w-10 sm:h-5">
                <FaArrowRight />
              </div>
            </button>
            <div className="mt-4 sm:mt-8 text-white text-base sm:text-2xl leading-wide text-center font-gothamNarrow">
              Add your purchased products to earn reward points.
            </div>
          </div>
        </div>
      </div>
      {openModal ? (
        <UserAddProductModal handleClose={() => setOpenModal(false)} />
      ) : null}
    </>
  );
};

export default UserRegisteredProductBanner;
