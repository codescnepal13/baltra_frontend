import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReadAboutImage from "../../../assets/images/readAboutBannerImg.png";
import TopHeader from "../../../components/topHeader/TopHeader";

const ReadAboutBanner = () => {

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.5,  
  });

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 }, 
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="w-full relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <TopHeader />
        </div>

        <div
          className="w-full h-[250px] sm:h-[350px] md:h-[448px] bg-black bg-opacity-60"
          style={{
            backgroundImage: `url(${ReadAboutImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          loading="lazy"
        >
       
          <div
            className="flex items-center justify-center h-full w-full text-white text-3xl sm:text-4xl md:text-5xl font-gothamNarrow font-bold"
          >
            <motion.div
              ref={ref} 
              variants={titleVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              ABOUT US
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadAboutBanner;
