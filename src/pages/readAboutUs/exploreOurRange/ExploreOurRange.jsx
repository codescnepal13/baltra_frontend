import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import ExploreImage from "../../../assets/images/oneImage.jpg";

/* ── Animation variants ─────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const fadeRight = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

/* ── Component ──────────────────────────────────────────── */
const ExploreOurRange = () => {
  const navigate = useNavigate();

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* ── Background accent — large red diagonal slab ── */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-[48%] origin-top-right hidden lg:block"
        style={{
          background: "linear-gradient(160deg, #FFF5F5 0%, #FDE8E8 100%)",
          clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* ── Decorative number watermark ── */}
      <div className="pointer-events-none absolute right-8 top-6 hidden lg:block select-none">
        <span
          className="font-gothamNarrow font-bold text-[120px] leading-none tracking-tighter"
          style={{ color: "rgba(237,28,36,0.06)" }}
        >
          01
        </span>
      </div>

      <div className="container relative mx-auto px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
          {/* ── Left: Text content ── */}
          <div className="lg:w-[52%] xl:w-[48%] flex flex-col">
            {/* Eyebrow label */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0)}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500 font-gothamNarrow">
                <span className="w-6 h-px bg-red-500 inline-block" />
                Our Collection
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.1)}
              className="mb-6"
            >
              <h2 className="font-gothamNarrow font-bold text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.05] tracking-tight text-gray-950">
                EXPLORE
                <br />
                <span className="text-[#ED1C24]">OUR RANGE</span>
              </h2>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.2)}
              className="mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-10 bg-red-600 rounded-full" />
                <div className="h-[3px] w-3 bg-red-300 rounded-full" />
              </div>
            </motion.div>

            {/* Body text */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.25)}
              className="mb-4"
            >
              <p className="text-[15px] leading-[1.8] text-gray-600 font-gothamNarrow">
                Discover the{" "}
                <span className="text-red-600 font-semibold">BALTRA</span>{" "}
                difference with our diverse selection of home appliances. From
                cutting-edge kitchen gadgets and efficient laundry solutions to
                stylish climate control systems — we have products to meet every
                need.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.32)}
              className="mb-10"
            >
              <p className="text-[15px] leading-[1.8] text-gray-500 font-gothamNarrow">
                Our kitchen lineup features innovative cooking ranges, microwave
                ovens, high-performance blenders, and coffee makers. Our climate
                control solutions keep your home comfortable year-round.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.38)}
              className="mb-10 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8"
            >
              {[
                { value: "200+", label: "Products" },
                { value: "50+", label: "Categories" },
                { value: "10+", label: "Years Trust" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-gothamNarrow font-bold text-2xl sm:text-3xl text-gray-900 leading-none mb-1">
                    {value}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-gray-400 font-gothamNarrow">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.44)}
            >
              <button
                onClick={() => navigate("/baltra-allProducts")}
                className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold font-gothamNarrow text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
              >
                Explore All Products
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <FiArrowUpRight
                    size={14}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                </span>
              </button>
            </motion.div>
          </div>

          {/* ── Right: Image ── */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageReveal}
            className="relative lg:w-[48%] xl:w-[52%] mt-12 lg:mt-0"
          >
            {/* Floating red accent box behind image */}
            <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-red-600/8 rounded-2xl hidden sm:block" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-red-600/5 rounded-xl hidden sm:block" />

            {/* Image wrapper with clip + shadow */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-gray-200/80">
              {/* Red corner accent */}
              <div
                className="absolute top-0 left-0 w-16 h-16 bg-red-600 z-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />

              <img
                src={ExploreImage}
                alt="Baltra product range"
                className="w-full h-auto object-cover block"
                style={{ aspectRatio: "4/3" }}
              />

              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow mb-0.5">
                  Trusted Since
                </div>
                <div className="text-lg font-bold text-gray-900 font-gothamNarrow leading-none">
                  2014
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExploreOurRange;
