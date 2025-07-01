import React from "react";
import buyBaltraImg from "../../../assets/images/buyBaltraImg.png";
import LogInImg from "../../../assets/images/LogInImage.png";
import redeemImg from "../../../assets/images/redeemImg.png";
import reviewRatingImg from "../../../assets/images/reviewBaltraImg.png";
import { FaArrowRight } from "react-icons/fa";

const products = [
  {
    img: buyBaltraImg,
    alt: "Buy Baltra Products",
    bgColor: "bg-[#FAEAAF]",
    title: "Buy Baltra Products",
    description: "Explore and purchase BALTRA products at any outlet",
    buttonText: "Explore Products",
    textColor: "text-[#665207]",
  },
  {
    img: LogInImg,
    alt: "Log In your Baltra Account",
    bgColor: "bg-[#B0FAAF]",
    title: "Log In your Baltra Account",
    description:
      "Sign up on our website or download the app to create your account and log in.",
    buttonText: "Click here to Login",
    textColor: "text-[#096607]",
  },
  {
    img: redeemImg,
    alt: "Redeem your Points",
    bgColor: "bg-[#AFECFA]",
    title: "Redeem your Points",
    description:
      "Register your purchased products to accumulate points and unlock exciting rewards.",
    buttonText: "Click here to Register",
    textColor: "text-[#071666]",
  },
  {
    img: reviewRatingImg,
    alt: "Review & Earn",
    bgColor: "bg-[#F4FAAF]",
    title: "Review & Earn",
    description:
      "Leave a review for the product you purchased and earn 100 points.",
    buttonText: "Click here to Review",
    textColor: "text-[#665207]",
  },
];

const BaltraHowItWorks = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center mt-8 lg:mt-16">
      <div className="flex gap-2 text-center">
        <div className="text-[#000C22] text-xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow">
          HOW IT
        </div>
        <div className="text-[#F02121] text-xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow">
          WORKS
        </div>
      </div>
      <div className="text-center text-[#494040] text-base mt-1 font-gothamNarrow">
        Get rewards for purchasing Baltra products
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-5 md:mt-10 px-4 md:px-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`w-full sm:w-[280px] md:w-[315px] h-auto p-4 ${product.bgColor} flex flex-col items-center gap-4 rounded-sm shadow-md`}
          >
            <img
              className="w-full h-48 sm:h-56 object-cover"
              src={product.img}
              alt={product.alt}
            />
            <div className="w-full flex flex-col items-start gap-1.5 flex-grow">
              <div
                className={`text-lg font-gothamNarrow sm:text-xl md:text-2xl font-medium ${product.textColor}`}
              >
                {product.title}
              </div>
              <div
                className={`text-xs sm:text-sm font-light font-gothamNarrow leading-5 ${product.textColor}`}
              >
                {product.description}
              </div>
            </div>
            <div className="w-full flex justify-center items-center gap-2 py-2 mt-auto bg-[#F3232B] rounded-md">
              <div className="text-white text-xs sm:text-sm font-gothamNarrow font-medium leading-5">
                {product.buttonText}
              </div>
              <FaArrowRight className="text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaltraHowItWorks;
