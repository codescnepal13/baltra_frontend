import { motion } from "framer-motion";
import { FiArrowUpRight, FiHome, FiShield, FiStar } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import BaltrafamilyImg from "../../../assets/images/BaltraFamilyImg.png";

/* ── Animation variants ─────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const imageReveal = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

/* ── Perks data ─────────────────────────────────────────── */
const PERKS = [
  {
    icon: FiShield,
    label: "Warranty Support",
    desc: "Dedicated after-sales care",
  },
  {
    icon: FiStar,
    label: "Loyalty Rewards",
    desc: "Earn points on every purchase",
  },
  {
    icon: FiHome,
    label: "Smart Home Ready",
    desc: "Products built for modern living",
  },
];

/* ── Component ──────────────────────────────────────────── */
const BaltraFamily = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FAFAFA] py-16 sm:py-20 lg:py-24"
    >
      {/* ── Background accent — left side warm tint ── */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-[46%] hidden lg:block"
        style={{
          background: "linear-gradient(200deg, #FFF5F5 0%, #FDE8E8 100%)",
          clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* ── Watermark ── */}
      <div className="pointer-events-none absolute left-6 top-6 hidden lg:block select-none">
        <span
          className="font-gothamNarrow font-bold text-[120px] leading-none tracking-tighter"
          style={{ color: "rgba(237,28,36,0.055)" }}
        >
          02
        </span>
      </div>

      <div className="container relative mx-auto px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
          {/* ── Left: Image ── */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageReveal}
            className="relative lg:w-[48%] xl:w-[50%] mt-12 lg:mt-0"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-red-600/8 rounded-2xl hidden sm:block" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-red-600/5 rounded-xl hidden sm:block" />

            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-gray-200/80">
              {/* Red corner accent — bottom right this time (mirrored from ExploreOurRange) */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 bg-red-600 z-10"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />

              <img
                src={BaltrafamilyImg}
                alt="Baltra family"
                className="w-full h-auto object-cover block"
                style={{ aspectRatio: "4/3" }}
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Floating member badge */}
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-gothamNarrow mb-0.5">
                  Happy Members
                </div>
                <div className="text-lg font-bold text-gray-900 font-gothamNarrow leading-none">
                  50,000+
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Text content ── */}
          <div className="lg:w-[52%] xl:w-[50%] flex flex-col">
            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0)}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500 font-gothamNarrow">
                <span className="w-6 h-px bg-red-500 inline-block" />
                Community
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
                JOIN THE
                <br />
                <span className="text-[#ED1C24]">BALTRA</span>{" "}
                <span className="text-gray-950">FAMILY</span>
              </h2>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.18)}
              className="mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-10 bg-red-600 rounded-full" />
                <div className="h-[3px] w-3 bg-red-300 rounded-full" />
              </div>
            </motion.div>

            {/* Body */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.24)}
              className="mb-8"
            >
              <p className="text-[15px] leading-[1.8] text-gray-600 font-gothamNarrow">
                Welcome to{" "}
                <span className="text-red-600 font-semibold">BALTRA</span>. We
                redefine home living through innovative, elegant, and
                high-quality appliances — designed to bring comfort,
                convenience, and style to every corner of your home.
              </p>
            </motion.div>

            {/* Perks list */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.3)}
              className="mb-10 flex flex-col gap-3"
            >
              {PERKS.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <Icon size={16} className="text-red-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-gray-900 font-gothamNarrow leading-tight">
                      {label}
                    </div>
                    <div className="text-[12px] text-gray-400 font-gothamNarrow leading-tight mt-0.5">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp(0.38)}
            >
              <button
                onClick={() => navigate("/baltra-account-signUp")}
                className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold font-gothamNarrow text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
              >
                Join the Family
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <FiArrowUpRight
                    size={14}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BaltraFamily;
