import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BaltrafamilyImg from "../../../assets/images/BaltraFamilyImg.png";
import { useNavigate } from "react-router-dom";

const xAxisVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const yAxisVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const BaltraFamily = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/baltra-account-signUp");
  };


  const { ref: leftRef, inView: leftInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: rightRef, inView: rightInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:flex md:flex-row md:justify-between md:gap-8">
          {/* Left Content */}
          <motion.div
            ref={leftRef}
            className="md:w-1/2 md:pl-12"
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            variants={xAxisVariants}
          >
            <div className="mb-8">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black font-gothamNarrow">
                JOIN THE{" "}
                <span className="text-[#ED1C24] font-semibold">BALTRA</span>{" "}
                <span className="text-black">FAMILY</span>
              </h1>
            </div>
            <div className="mb-8">
              <p className="text-base font-light leading-relaxed font-gothamNarrow">
                Welcome to <span className="text-[#ED1C24]">BALTRA!</span>. We’re
                excited to have you with us as we redefine home living through
                innovative, elegant, and high-quality appliances. At Baltra, we
                are committed to enhancing your home with products that bring
                comfort, convenience, and style.
              </p>
            </div>
            <div className="mb-8">
              <p className="text-base font-light leading-relaxed font-gothamNarrow">
                At Baltra, we’re dedicated to enhancing your home with appliances
                designed to offer unmatched comfort, convenience, and style.
                Explore our diverse range of products and discover how Baltra can
                elevate your living space with timeless elegance and cutting-edge
                technology.
              </p>
            </div>
            <div className="mb-4">
              <p className="text-base font-light leading-relaxed font-gothamNarrow">
                Join us in experiencing a new era of home appliances, where your
                satisfaction is our top priority. Welcome to the Baltra family!
              </p>
            </div>
            <div className="w-full md:w-auto md:max-w-xs">
              <button
                onClick={handleSignUp}
                className="w-full md:w-auto px-6 md:px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-normal font-gothamNarrow"
              >
                Sign Up
              </button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            ref={rightRef}
            className="w-full md:w-1/2 mt-8 md:mt-0 mb-12"
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            variants={yAxisVariants}
          >
            <img
              className="w-full h-auto max-w-full md:max-w-none"
              src={BaltrafamilyImg}
              alt="Baltra Family"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BaltraFamily;
