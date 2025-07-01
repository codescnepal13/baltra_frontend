import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ExploreImage from "../../../assets/images/oneImage.jpg";
import { useNavigate } from "react-router-dom";

const xAxisVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const yAxisVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const ExploreOurRange = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/baltra-allProducts");
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
    <>
        <div className="relative pt-14">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:flex md:flex-row md:justify-between md:gap-8">
          {/* Left Content */}
          <motion.div
            ref={leftRef}
            className="md:w-1/2 md:pl-12 pt-8"
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            variants={xAxisVariants}
          >
            <div className="mb-8">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black font-gothamNarrow">
                EXPLORE OUR{" "}
                <span className="text-[#ED1C24] font-semibold">RANGE</span>{" "}
              </h1>
            </div>
            <div className="mb-8">
              <p className="text-base font-light leading-relaxed font-gothamNarrow">
                Discover the <span className="text-[#ED1C24]">BALTRA!</span>.
                difference with our diverse selection of home appliances. From
                cutting-edge kitchen gadgets and efficient laundry solutions to
                stylish climate control systems, we have products to meet every
                need.
              </p>
            </div>
            <div className="mb-8">
              <p className="text-base font-light leading-relaxed font-gothamNarrow">
                Our kitchen lineup features innovative cooking ranges, microwave
                ovens, high-performance blenders, and coffee makers. For
                laundry, our washers and dryers deliver exceptional cleaning
                power while being gentle on your clothes. Our climate control
                solutions, including air conditioners and heaters, keep your
                home comfortable year-round
              </p>
            </div>
      
            <div className="w-full sm:w-[200px] py-3 bg-red-600 hover:bg-red-700 rounded-full flex justify-center items-center cursor-pointer">
              <button
                onClick={handleExplore}
                className="text-white text-base sm:text-lg md:text-lg font-medium font-gothamNarrow"
              >
                Explore
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
              src={ExploreImage}
              alt="Baltra ExploreImage"
            />
          </motion.div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default ExploreOurRange
