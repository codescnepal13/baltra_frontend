import { motion } from "framer-motion";
import MileStoneImg from "../../../assets/images/MileStoneImage.png";
import HomeApplianceCard from "./homeApplianceCard/HomeApplianceCard";

const BaltraCompetenCies = () => {
  return (
    <>
      <div className="relative w-full min-h-screen flex flex-col justify-between">
        {/* Background Image as Overlay */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${MileStoneImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>

        {/* Milestone Content */}
        <div className="relative lg:z-20 flex flex-col items-center my-12 lg:my-16">
          <motion.div
            className="text-[#202D31] text-3xl sm:text-4xl md:text-5xl font-bold font-gothamNarrow mb-2"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            Core Competencies
          </motion.div>

          <motion.div
            className="text-[#000000] text-lg sm:text-xl md:text-2xl font-normal font-gothamNarrow tracking-normal leading-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            Mastering Home Appliance ExCellence
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative lg:z-20 mt-0 lg:mt-8">
          <HomeApplianceCard />
        </div>
      </div>
    </>
  );
};

export default BaltraCompetenCies;
