import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArtCoverImg from "../../../assets/images/userAuthImg.png";

const SILK = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: SILK, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: "easeOut", delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: SILK, delay },
  }),
};

const ArtOfComfort = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 200]);
  const y2 = useTransform(scrollY, [0, 600], [0, -200]);
  const y3 = useTransform(scrollY, [0, 600], [0, 350]);
  const imgOpacity = useTransform(scrollY, [0, 200], [0, 0.85]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden -mt-px"
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={ArtCoverImg}
          alt="ArtImg"
          aria-hidden="true"
          className="w-full h-full object-cover object-top"
          style={{ filter: "brightness(0.45)" }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[717px] flex flex-col justify-center items-center gap-8 lg:sticky lg:top-10 lg:z-10 px-4 py-16">
        {/* Heading */}
        <motion.div
          className="w-full max-w-[505px] text-center text-white text-3xl sm:text-4xl lg:text-5xl font-bold font-gothamNarrow"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          Live Your Home: The Art of Comfort
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, ease: SILK, delay: 0.3 }}
          style={{ originX: 0.5 }}
          className="w-16 h-px bg-white opacity-40"
        />

        {/* Body text */}
        <motion.div
          className="w-full text-center text-white text-sm sm:text-base leading-[25.33px]"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.45}
        >
          Welcome to Baltra, where innovation meets elegance in home appliances.
          We pride ourselves on crafting exclusive, modern appliances with sleek
          designs and cutting-edge technology. Our products boast minimalist
          aesthetics, energy efficiency, and smart technology, effortlessly
          blending into any home decor.
          <br />
          <br />
          At Baltra, we believe in creating appliances built to last, providing
          a timeless and elegant addition to homes for years to come. From the
          kitchen to the living room, our appliances enhance everyday life with
          unparalleled convenience and style. Designed for modern living, each
          product reflects our commitment to quality and customer satisfaction.
          <br />
          <br />
          Read more about Baltra and elevate your living space with our
          meticulously crafted appliances.
        </motion.div>

        {/* Button */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.7}
        >
          <Link to="/baltra-readAboutUS">
            <motion.button
              className="relative overflow-hidden text-sm sm:text-base font-light leading-[18.67px] tracking-wider shadow-lg px-8 sm:px-12 py-2.5 bg-white border border-[#DFDEDB] flex justify-center items-center"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 pointer-events-none"
                animate={{
                  boxShadow: isHovered
                    ? "0px 0px 14px rgba(245,222,12,0.45), 0px 4px 12px rgba(223,98,98,0.45)"
                    : "0px 2px 8px rgba(0,0,0,0.08)",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
              <motion.span
                className="relative z-10 text-[#323334]"
                animate={{
                  opacity: isHovered ? 1 : 0.55,
                  scale: isHovered ? 1.03 : 1,
                }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                READ ABOUT US
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtOfComfort;
