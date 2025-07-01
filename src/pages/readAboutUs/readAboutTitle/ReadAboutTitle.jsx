import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ReadAboutTitle = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full flex justify-center my-4 sm:my-6 md:my-8 px-4">
      <motion.div
        ref={ref}
        variants={textVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1010px] text-center"
      >
        <span className="text-[#000000] text-base sm:text-lg md:text-xl font-gothamNarrow">
          Welcome to{" "}
        </span>
        <span className="text-red-600 text-base sm:text-lg md:text-xl font-semibold font-gothamNarrow">
          BALTRA
        </span>
        <span className="text-[#000000] text-base font-gothamNarrow">
          ,where innovation meets elegance in home appliances. We are committed
          to excellence, curating modern solutions that redefine functionality
          and style for every household.
        </span>
      </motion.div>
    </div>
  );
};

export default ReadAboutTitle;
