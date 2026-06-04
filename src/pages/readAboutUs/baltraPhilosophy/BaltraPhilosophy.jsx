import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fiveImage from "../../../assets/images/fiveImage.jpeg";
import fourImage from "../../../assets/images/fourImage.jpeg";
import ThreeImage from "../../../assets/images/threeImage.jpeg";
import TwoImage from "../../../assets/images/twoImage.jpeg";

/* ── Animation variants ─────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const fadeScale = (delay = 0) => ({
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  },
});

/* ── Philosophy cards data ──────────────────────────────── */
const PILLARS = [
  {
    number: "01",
    title: "Quality & Craftsmanship",
    body: "Our expert engineers use the finest materials and rigorous testing to ensure durability and performance. Every appliance combines function and style — adding elegance to your home while delivering lasting reliability.",
    image: TwoImage,
    alt: "Quality craftsmanship",
    accent: "from-red-50 to-orange-50",
  },
  {
    number: "02",
    title: "Innovation & Technology",
    body: "BALTRA embraces cutting-edge technology to enhance daily living. Smart appliances with intuitive controls and energy-saving modes simplify your life — from adaptive refrigerators to water-efficient washing machines.",
    image: ThreeImage,
    alt: "Innovation and technology",
    accent: "from-slate-50 to-gray-100",
  },
  {
    number: "03",
    title: "Energy Efficiency & Sustainability",
    body: "Dedicated to a greener future, our appliances lower utility bills and minimize environmental impact — integrating the latest energy-saving technologies to reduce waste and emissions for generations ahead.",
    image: fourImage,
    alt: "Energy efficiency",
    accent: "from-red-50 to-orange-50",
  },
  {
    number: "04",
    title: "Design & Aesthetics",
    body: "Every product is crafted to blend flawless functionality with sleek, modern design. We believe the right appliance doesn't just work — it transforms the beauty and comfort of your living space.",
    image: fiveImage,
    alt: "Design and aesthetics",
    accent: "from-slate-50 to-gray-100",
  },
];

/* ── Single pillar card ─────────────────────────────────── */
const PillarCard = ({ pillar, index, inView }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp(index * 0.12)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-red-100 transition-all duration-500"
    >
      {/* Image */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeScale(index * 0.12 + 0.08)}
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={pillar.image}
          alt={pillar.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Number badge — floats on image */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md">
            <span className="font-gothamNarrow font-bold text-2xl leading-none text-red-600 tracking-tight">
              {pillar.number}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Text content */}
      <div
        className={`flex flex-col flex-1 p-6 sm:p-7 bg-gradient-to-br ${pillar.accent}`}
      >
        {/* Top accent line */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[2.5px] w-8 bg-red-600 rounded-full" />
          <div className="h-[2.5px] w-2 bg-red-300 rounded-full" />
        </div>

        <h3 className="font-gothamNarrow font-bold text-lg sm:text-xl text-gray-950 leading-snug mb-3 tracking-tight">
          {pillar.title}
        </h3>

        <p className="text-[14px] leading-[1.8] text-gray-500 font-gothamNarrow flex-1">
          {pillar.body}
        </p>
      </div>
    </motion.div>
  );
};

/* ── Main component ─────────────────────────────────────── */
const BaltraPhilosophy = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#F9F9F9] py-16 sm:py-20 lg:py-24"
    >
      {/* ── Subtle background texture dots ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ED1C24 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Watermark ── */}
      <div className="pointer-events-none absolute right-6 bottom-8 hidden lg:block select-none">
        <span
          className="font-gothamNarrow font-bold text-[110px] leading-none tracking-tighter"
          style={{ color: "rgba(237,28,36,0.05)" }}
        >
          03
        </span>
      </div>

      <div className="relative container mx-auto px-5 sm:px-8 lg:px-14 xl:px-20">
        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp(0)}
          className="mb-14 lg:mb-16"
        >
          {/* Eyebrow */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500 font-gothamNarrow">
              <span className="w-6 h-px bg-red-500 inline-block" />
              What We Stand For
              <span className="w-6 h-px bg-red-500 inline-block" />
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-center font-gothamNarrow font-bold text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] leading-[1.05] tracking-tight text-gray-950 mb-6">
            OUR <span className="text-[#ED1C24]">PHILOSOPHY</span>
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-[3px] w-10 bg-red-600 rounded-full" />
            <div className="h-[3px] w-3 bg-red-300 rounded-full" />
          </div>

          {/* Intro paragraph */}
          <p className="max-w-3xl mx-auto text-center text-[15px] leading-[1.85] text-gray-500 font-gothamNarrow">
            At the core of{" "}
            <span className="text-red-600 font-semibold">BALTRA'S</span>{" "}
            philosophy is a dedication to innovation and quality. We believe
            home appliances should do more than perform a task — they should
            enrich your lifestyle, integrating the latest technology with
            eco-friendly design that stands the test of time.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.number}
              pillar={pillar}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Bottom tagline ── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp(0.55)}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          <div className="h-px w-16 bg-gray-200 hidden sm:block" />
          <p className="text-[13px] uppercase tracking-[0.2em] text-gray-400 font-gothamNarrow font-semibold text-center">
            Built to last · Designed to inspire · Made for you
          </p>
          <div className="h-px w-16 bg-gray-200 hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
};

export default BaltraPhilosophy;
