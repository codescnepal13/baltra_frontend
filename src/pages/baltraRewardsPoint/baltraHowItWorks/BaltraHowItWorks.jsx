import { FaArrowRight } from "react-icons/fa";
import buyBaltraImg from "../../../assets/images/buyBaltraImg.png";
import LogInImg from "../../../assets/images/LogInImage.png";
import redeemImg from "../../../assets/images/redeemImg.png";
import reviewRatingImg from "../../../assets/images/reviewBaltraImg.png";

const products = [
  {
    img: buyBaltraImg,
    alt: "Buy Baltra Products",
    bgColor: "bg-[#FAEAAF]",
    title: "Buy Baltra Products",
    description: "Explore and purchase BALTRA products at any outlet",
    buttonText: "Explore Products",
    textColor: "text-[#665207]",
    accentColor: "#D9B400",
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
    accentColor: "#3BB23A",
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
    accentColor: "#2E7FD6",
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
    accentColor: "#C7B900",
  },
];

const BaltraHowItWorks = () => {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow text-[#000C22]">
              HOW IT
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow text-[#F02121]">
              WORKS
            </h2>
          </div>
          <p className="text-[#494040] text-sm sm:text-base mt-2 font-gothamNarrow">
            Get rewards for purchasing Baltra products
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-8 md:mt-12 items-stretch">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`group relative h-full ${product.bgColor} rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Step number */}
              <span
                className="absolute top-4 right-4 text-xs font-bold font-gothamNarrow text-white w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: product.accentColor }}
              >
                {index + 1}
              </span>

              {/* Image */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/40">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={product.img}
                  alt={product.alt}
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col items-start gap-1.5 flex-1">
                <h3
                  className={`text-lg sm:text-xl font-medium font-gothamNarrow ${product.textColor}`}
                >
                  {product.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-light font-gothamNarrow leading-5 ${product.textColor}`}
                >
                  {product.description}
                </p>
              </div>

              {/* CTA */}
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 py-2.5 mt-auto bg-[#F3232B] rounded-lg hover:bg-[#d81b22] transition-colors"
              >
                <span className="text-white text-xs sm:text-sm font-gothamNarrow font-medium leading-5">
                  {product.buttonText}
                </span>
                <FaArrowRight className="text-white text-xs transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BaltraHowItWorks;
