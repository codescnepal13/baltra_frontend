import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

const ReadAboutParagraphBelow = () => {
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
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1010px]"
      >
        <span className="text-[#000000] text-base md:font-lg font-gothamNarrow">
          At BALTRA, we don't just create products; we craft sophisticated
          appliances that elevate everyday living. Our minimalist design
          philosophy ensures that each item adds a timeless allure to any décor,
          from contemporary to classic. Beyond aesthetics, we integrate
          cutting-edge technology, setting new standards for performance and
          convenience. With features like smart home capabilities and energy
          efficiency, every BALTRA product is engineered to enhance modern
          lifestyles while minimizing environmental impact.
        </span>
        <br />
        <br />
        <span className="text-[#000000] text-base md:font-lg font-gothamNarrow">
          Join us on a journey of innovation and elegance as we continue to push
          the boundaries of what home appliances can achieve. Discover the
          BALTRA difference and transform your home into a sanctuary of modern
          luxury.
        </span>
      </motion.div>
    </div>
  );
};

export default ReadAboutParagraphBelow;
