import { motion } from "framer-motion";
import CostImg from "../../../../assets/images/costImg.png";
import InnovationImg from "../../../../assets/images/Innovation.png";
import ProcessImg from "../../../../assets/images/processImg.png";
import QualityImg from "../../../../assets/images/qualityImg.png";
import ServiceImg from "../../../../assets/images/serviceImg.png";
import TimeImg from "../../../../assets/images/timeImg.png";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

const cards = [
  {
    img: ProcessImg,
    alt: "Process",
    title: "Process",
    desc: "We adhere to strict, well-engineered processes.",
  },
  {
    img: TimeImg,
    alt: "Time",
    title: "Time",
    desc: "We ensure on-time delivery for customer demands.",
  },
  {
    img: ServiceImg,
    alt: "Service",
    title: "Service",
    desc: "Our professional team is dedicated to exceptional customer service.",
  },
  {
    img: CostImg,
    alt: "Cost",
    title: "Cost",
    desc: "We prioritize cost control by optimizing supply chain resources.",
  },
  {
    img: QualityImg,
    alt: "Quality",
    title: "Quality",
    desc: "Our commitment is to deliver reliable quality.",
  },
  {
    img: InnovationImg,
    alt: "Innovation",
    title: "Innovation",
    desc: "We foster management and technical innovation to stay ahead in the industry.",
  },
];

const HomeApplianceCard = () => {
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 max-w-screen-xl">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="w-full max-w-sm h-auto px-6 py-8 bg-white bg-opacity-20 border border-gray-300 backdrop-blur-lg flex flex-col justify-center items-center gap-4 md:gap-6 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.img
                className="w-20 h-20 md:w-28 md:h-28"
                src={card.img}
                alt={card.alt}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12 + 0.2,
                  duration: 0.45,
                  ease: "easeOut",
                }}
              />
              <div className="text-center text-black text-base md:text-xl font-bold font-gothamNarrow">
                {card.title}
              </div>
              <div className="w-full text-center text-gray-800 text-sm md:text-lg font-light">
                {card.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeApplianceCard;
