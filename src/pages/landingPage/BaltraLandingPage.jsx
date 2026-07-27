import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandImg1 from "../../assets/images/LandImg1.png";
import LandImg2 from "../../assets/images/LandImg2.png";
import LandImg3 from "../../assets/images/LandImg3.png";
import InfoLayoutModal from "../../components/layout/infoLayout/InfoLayoutModal";
import "./LandingPage.css";

/* ── Particle canvas (unchanged from your version) ── */
function useParticles(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 52 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.3 + 0.07,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [ref]);
}

function useInView(ref, threshold = 0.05) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return v;
}

/* ── Product data — swap in real copy ── */
const PRODUCT_IMAGES = [
  {
    id: "left",
    src: LandImg3,
    alt: "Baltra appliance",
    pos: "left",
    title: "Precision Series",
    desc: "Engineered for everyday performance, built to outlast the ordinary.",
  },
  {
    id: "center",
    src: LandImg2,
    alt: "Baltra featured appliance",
    pos: "center",
    title: "Signature Line",
    desc: "Our flagship design — where form and function share the spotlight.",
  },
  {
    id: "right",
    src: LandImg1,
    alt: "Baltra appliance",
    pos: "right",
    title: "Essentials Collection",
    desc: "Everyday appliances refined with a premium finish.",
  },
];

/* ── 3D tilt-on-hover, mouse-tracked, spring-smoothed ── */
function useTilt(disabled) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [10, -10]),
    springCfg,
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-10, 10]),
    springCfg,
  );
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), springCfg);
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), springCfg);

  const onMouseMove = useCallback(
    (e) => {
      if (disabled || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - r.left) / r.width - 0.5);
      rawY.set((e.clientY - r.top) / r.height - 0.5);
    },
    [disabled, rawX, rawY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, glowX, glowY, onMouseMove, onMouseLeave };
}

const BaltraLandingPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [dividerOn, setDividerOn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const heroVisible = useInView(heroRef, 0.05);
  const contentVisible = useInView(contentRef, 0.05);

  useParticles(canvasRef);
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmed) setShowModal(false);
  }, [confirmed]);

  useEffect(() => {
    if (heroVisible) {
      const t = setTimeout(() => setDividerOn(true), 700);
      return () => clearTimeout(t);
    }
  }, [heroVisible]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleGoToHomepage = useCallback(() => {
    if (!confirmed) {
      alert("Please confirm your choice before proceeding.");
      return;
    }
    setExiting(true);
    setTimeout(() => navigate("/baltra-aboutUs-Page"), 1400);
  }, [confirmed, navigate]);

  return (
    <>
      <div
        id="baltra-page"
        className={`baltra-page ${exiting ? "baltra-exiting" : ""}`}
      >
        <canvas
          ref={canvasRef}
          className="baltra-particles"
          aria-hidden="true"
        />
        <div className="baltra-grain" aria-hidden="true" />
        <div className="baltra-radial" aria-hidden="true" />
        <div className="baltra-badge">Since 1993 · Home Appliances</div>

        <section ref={heroRef} className="baltra-hero" aria-label="Hero">
          <p className={`baltra-eyebrow ${heroVisible ? "anim-fadein" : ""}`}>
            3D Interactive Experience
          </p>
          <h1 className={`baltra-welcome ${heroVisible ? "anim-riseup" : ""}`}>
            Welcome to
          </h1>
          <div
            className={`baltra-name ${heroVisible ? "anim-riseup-delay" : ""}`}
          >
            BALTRA
          </div>
          <div
            className={`baltra-divider ${dividerOn ? "baltra-divider--on" : ""}`}
          />
          <h2
            className={`baltra-subtitle ${heroVisible ? "anim-fadeup-d2" : ""}`}
          >
            Step into the Future of Home Appliances
          </h2>
          <p className={`baltra-body ${heroVisible ? "anim-fadeup-d3" : ""}`}>
            Visualize, interact, and understand home appliances like never
            before. Innovative designs tailored to elevate every corner of your
            home — from the kitchen to the living room.
          </p>
          <div
            className={`baltra-pills ${heroVisible ? "anim-fadeup-d4" : ""}`}
          >
            {[
              { v: "200+", l: "Products" },
              { v: "12", l: "Categories" },
              { v: "18", l: "Countries" },
            ].map(({ v, l }) => (
              <span key={l} className="baltra-pill">
                <strong>{v}</strong>
                {l}
              </span>
            ))}
          </div>
        </section>

        {/* ══ PRODUCTS — premium 3D tilt + shared-layout showcase ══ */}
        <section
          ref={contentRef}
          className={`baltra-imgs ${contentVisible ? "anim-fadein-d1" : ""}`}
          aria-label="Product showcase"
        >
          <div className="baltra-imgs__row">
            {PRODUCT_IMAGES.map((img, i) => (
              <ProductThumb
                key={img.id}
                img={img}
                disabled={prefersReducedMotion || activeIndex !== null}
                dimmed={activeIndex !== null && activeIndex !== i}
                onOpen={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <div className="baltra-stage" aria-hidden="true" />
        </section>

        <div className={`baltra-cta ${contentVisible ? "anim-fadeup-d5" : ""}`}>
          <button
            onClick={handleGoToHomepage}
            className="baltra-btn"
            aria-label="Go to Baltra homepage"
          >
            Explore Homepage
            <span className="baltra-btn__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                  stroke="#C01414"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <p className="baltra-cta__hint">
            {confirmed
              ? "Ready — click to enter"
              : "Confirm your choice in the modal first"}
          </p>
        </div>

        <div className="baltra-scroll-ind" aria-hidden="true">
          <span>Scroll</span>
          <div className="baltra-scroll-line" />
        </div>
      </div>

      {/* ── Fullscreen showcase overlay ── */}
      <AnimatePresence>
        {activeIndex !== null && (
          <ShowcaseOverlay
            product={PRODUCT_IMAGES[activeIndex]}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>

      {showModal && <InfoLayoutModal setConfirmed={setConfirmed} />}
    </>
  );
};

/* ── Individual floating thumbnail with tilt + shine ── */
function ProductThumb({ img, disabled, dimmed, onOpen }) {
  const { ref, rotateX, rotateY, glowX, glowY, onMouseMove, onMouseLeave } =
    useTilt(disabled);

  return (
    <motion.div
      className={`baltra-img-wrap baltra-img-wrap--${img.pos}`}
      animate={{
        opacity: dimmed ? 0.25 : 1,
        filter: dimmed ? "blur(3px)" : "blur(0px)",
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className={`baltra-img-tilt baltra-img-tilt--${img.pos}`}
        onClick={() => !disabled && onOpen()}
        role="button"
        tabIndex={0}
        aria-label={`Showcase ${img.alt} in 3D`}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {/* mouse-tracked glare */}
        <motion.div
          className="baltra-img-glare"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35), transparent 60%)`,
            ),
          }}
        />
        <motion.img
          layoutId={`product-image-${img.id}`}
          src={img.src}
          alt={img.alt}
          loading={img.pos === "center" ? "eager" : "lazy"}
          className={`baltra-img baltra-img--${img.pos}`}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Fullscreen cinematic showcase ── */
function ShowcaseOverlay({ product, onClose }) {
  return (
    <motion.div
      className="baltra-showcase"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="baltra-showcase__spotlight"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.button
        type="button"
        className="baltra-showcase__close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: -90 }}
        aria-label="Close showcase"
      >
        ×
      </motion.button>

      <div
        className="baltra-showcase__stage"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.src}
          alt={product.alt}
          className="baltra-showcase__img"
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 22,
            mass: 0.6,
          }}
        />

        <motion.div
          className="baltra-showcase__card"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="baltra-showcase__eyebrow">Baltra · Featured</span>
          <h3 className="baltra-showcase__title">{product.title}</h3>
          <p className="baltra-showcase__desc">{product.desc}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BaltraLandingPage;
