import React from "react";
import { motion } from "framer-motion";
import TwoImage from "../../../assets/images/twoImage.jpeg";
import ThreeImage from "../../../assets/images/threeImage.jpeg";
import fourImage from "../../../assets/images/fourImage.jpeg";
import fiveImage from "../../../assets/images/fiveImage.jpeg";

const BaltraPhilosophy = () => {
  const xAxisVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const yAxisVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-10 px-4 sm:px-6 lg:px-24 my-8">
  
      <motion.div
        className="mb-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={yAxisVariants}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-950 font-gothamNarrow mb-4">
          OUR <span className="text-red-600">PHILOSOPHY</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-base font-light leading-relaxed font-gothamNarrow">
            At the core of{" "}
            <span className="text-red-600 font-semibold">BALTRA'S</span>{" "}
            philosophy is a dedication to innovation and quality. We believe
            that home appliances should do more than just perform a task; they
            should enrich your lifestyle. That's why we integrate the latest
            technological advancements into our products, from smart
            connectivity features to eco-friendly operations. Our appliances are
            not only built to last but are also designed to provide a timeless
            and elegant addition to your home for years to come.
          </p>
        </div>
      </motion.div>

      {/* x-axis animation */}
      <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6 mb-12">
        {/* Section 1 */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={xAxisVariants}
        >
          <div className="bg-white rounded-tl-xl rounded-tr-xl overflow-hidden">
            <img
              className="w-full max-h-80 sm:max-h-96 object-cover"
              src={TwoImage}
              alt="Chimney Image"
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-gothamNarrow mb-2 font-semibold">
              1. Quality and Craftsmanship:
            </h3>
            <p className="text-base font-light leading-relaxed font-gothamNarrow">
              At BALTRA, we focus on quality and detail in every appliance. Our
              expert engineers use the finest materials and rigorous testing to
              ensure durability and performance. Our products combine function
              and style, adding elegance to your home while delivering
              reliability.
            </p>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={xAxisVariants}
        >
          <div className="bg-white rounded-tl-xl rounded-tr-xl overflow-hidden">
            <img
              className="w-full max-h-80 sm:max-h-96 object-cover"
              src={ThreeImage}
              alt="Jio Kettle Image"
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-gothamNarrow mb-2 font-semibold">
              2. Innovation and Technology:
            </h3>
            <p className="text-base font-light leading-relaxed font-gothamNarrow">
              BALTRA embraces cutting-edge technology to enhance daily living.
              Our smart appliances feature intuitive controls and energy-saving
              modes for convenience and efficiency. Our R&D team continuously
              explores new innovations, simplifying your life with products like
              adaptive refrigerators and water-efficient washing machines.
            </p>
          </div>
        </motion.div>
      </div>

      {/* y-axis animation */}
      <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6">
        {/* Section 3 */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={yAxisVariants}
        >
          <div className="bg-white rounded-tl-xl rounded-tr-xl overflow-hidden">
            <img
              className="w-full max-h-80 sm:max-h-96 object-cover"
              src={fourImage}
              alt="Dutch Image"
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-gothamNarrow mb-2 font-semibold">
              3. Energy Efficiency and Sustainability:
            </h3>
            <p className="text-base font-light leading-relaxed font-gothamNarrow">
              Dedicated to sustainability, BALTRA offers energy-efficient
              appliances that lower utility bills and minimize environmental
              impact. By integrating the latest energy-saving technologies, we
              promote eco-friendly practices and help build a greener future
              through reduced waste and emissions
            </p>
          </div>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={yAxisVariants}
        >
          <div className="bg-white rounded-tl-xl rounded-tr-xl overflow-hidden">
            <img
              className="w-full max-h-80 sm:max-h-96 object-cover"
              src={fiveImage}
              alt="Home Image"
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-gothamNarrow mb-2 font-semibold">
              4. Design and Aesthetics:
            </h3>
            <p className="text-base font-light leading-relaxed font-gothamNarrow">
              Our products are crafted to blend functionality with sleek, modern
              design, enhancing the beauty and comfort of your home. .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BaltraPhilosophy;
