import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";

const ArtOfComfort = () => {
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);

  // Parallax transforms using the new scroll hook
  const y1 = useTransform(scrollY, [0, 600], [0, 200]);
  const y2 = useTransform(scrollY, [0, 600], [0, -200]);
  const y3 = useTransform(scrollY, [0, 600], [0, 350]);

  return (
    <div className="w-full h-auto pt-4 sm:pt-0 lg:h-[200vh] bg-gray-100 flex flex-col justify-center items-center">
      {/* Sticky Section: Title, Description, and Button */}
      <div className="w-full max-w-[717px] flex flex-col justify-center items-center gap-8 lg:sticky lg:top-10 lg:z-10 px-4">
      <div className="flex flex-col justify-start items-center gap-6 sm:gap-12">
      {/* Title with animation */}
      <motion.div
        className="w-full max-w-[505px] text-center text-[#202D31] text-3xl sm:text-4xl lg:text-5xl font-bold font-gothamNarrow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Live Your Home: The Art of Comfort
      </motion.div>

      <motion.div
        className="w-full text-center text-black text-sm sm:text-base leading-[25.33px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        Welcome to Baltra, where innovation meets elegance in home appliances.
        We pride ourselves on crafting exclusive, modern appliances with sleek
        designs and cutting-edge technology. Our products boast minimalist
        aesthetics, energy efficiency, and smart technology, effortlessly
        blending into any home decor.
        <br />
        <br />
        At Baltra, we believe in creating appliances built to last, providing a
        timeless and elegant addition to homes for years to come. From the
        kitchen to the living room, our appliances enhance everyday life with
        unparalleled convenience and style. Designed for modern living, each
        product reflects our commitment to quality and customer satisfaction.
        <br />
        <br />
        Read more about Baltra and elevate your living space with our
        meticulously crafted appliances.
      </motion.div>
    </div>
        <Link to="/baltra-readAboutUS" className="">
          <AnimatePresence>
            <motion.button
              className="text-[#323334] text-sm sm:text-base font-light leading-[18.67px] tracking-wider shadow-lg px-8 sm:px-12 py-2.5 bg-white border border-[#DFDEDB] flex justify-center items-center transition-all duration-300"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{
                boxShadow:
                  "0px 0px 10px rgba(245, 222, 12, 0.5), 0px 4px 10px rgba(223, 98, 98, 0.5)",
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              animate={isHovered ? { opacity: 0.8 } : { opacity: 0.5 }}
            >
              READ ABOUT US
            </motion.button>
          </AnimatePresence>
        </Link>
      </div>

      {/* Image Section: Hidden on small screens */}
      <div className="w-full max-w-[1200px] relative hidden lg:flex">
        <motion.div className="sticky top-0 w-full h-[100vh] gap-4 flex justify-center items-center p-6">
          <motion.img
            src="/assets/Rectangle 537.png"
            alt="Image 1"
            className="w-[200px]"
            style={{ y: y1 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <motion.img
            src="/assets/Rectangle 538.png"
            alt="Image 2"
            className="w-[200px]"
            style={{ y: y2 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <motion.img
            src="/assets/Rectangle 539.png"
            alt="Image 3"
            className="w-[200px]"
            style={{ y: y1 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <motion.img
            src="/assets/Rectangle 540.png"
            alt="Image 4"
            className="w-[200px]"
            style={{ y: y3 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <motion.img
            src="/assets/Rectangle 541.png"
            alt="Image 5"
            className="w-[200px]"
            style={{ y: y2 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <motion.img
            src="/assets/Rectangle 542.png"
            alt="Image 6"
            className="w-[200px]"
            style={{ y: y1 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ArtOfComfort;
