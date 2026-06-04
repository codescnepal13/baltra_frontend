import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandImg1 from "../../assets/images/LandImg1.png";
import LandImg2 from "../../assets/images/LandImg2.png";
import LandImg3 from "../../assets/images/LandImg3.png";
import InfoLayoutModal from "../../components/layout/infoLayout/InfoLayoutModal";
import "./LandingPage.css";

/* ── Particle canvas ── */
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

/* ── useInView ── */
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

/* ════════════════════════════════════════════ */
const BaltraLandingPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [dividerOn, setDividerOn] = useState(false);

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

  /* Trigger divider after hero text appears */
  useEffect(() => {
    if (heroVisible) {
      const t = setTimeout(() => setDividerOn(true), 700);
      return () => clearTimeout(t);
    }
  }, [heroVisible]);

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
        {/* ── Atmosphere ── */}
        <canvas
          ref={canvasRef}
          className="baltra-particles"
          aria-hidden="true"
        />
        <div className="baltra-grain" aria-hidden="true" />
        <div className="baltra-radial" aria-hidden="true" />

        {/* ── Brand strip ── */}
        <div className="baltra-badge">Since 1993 · Home Appliances</div>

        {/* ══ HERO ══ */}
        <section ref={heroRef} className="baltra-hero" aria-label="Hero">
          {/* Eyebrow */}
          <p className={`baltra-eyebrow ${heroVisible ? "anim-fadein" : ""}`}>
            3D Interactive Experience
          </p>

          {/* "Welcome to" — original big weight, original style */}
          <h1 className={`baltra-welcome ${heroVisible ? "anim-riseup" : ""}`}>
            Welcome to
          </h1>

          {/* BALTRA — giant 3D bold with layered depth */}
          <div
            className={`baltra-name ${heroVisible ? "anim-riseup-delay" : ""}`}
          >
            BALTRA
          </div>

          {/* Animated divider */}
          <div
            className={`baltra-divider ${dividerOn ? "baltra-divider--on" : ""}`}
          />

          {/* Subtitle with 3D bold */}
          <h2
            className={`baltra-subtitle ${heroVisible ? "anim-fadeup-d2" : ""}`}
          >
            Step into the Future of Home Appliances
          </h2>

          {/* Body */}
          <p className={`baltra-body ${heroVisible ? "anim-fadeup-d3" : ""}`}>
            Visualize, interact, and understand home appliances like never
            before. Innovative designs tailored to elevate every corner of your
            home — from the kitchen to the living room.
          </p>

          {/* Stat pills */}
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

        {/* ══ PRODUCTS ══ */}
        <section
          ref={contentRef}
          className={`baltra-imgs ${contentVisible ? "anim-fadein-d1" : ""}`}
          aria-label="Product showcase"
        >
          <div className="baltra-imgs__row">
            <img
              src={LandImg3}
              alt="Baltra appliance"
              className="baltra-img baltra-img--left baltra-float-a"
              loading="lazy"
            />
            <img
              src={LandImg2}
              alt="Baltra featured appliance"
              className="baltra-img baltra-img--center baltra-float-b"
              loading="eager"
            />
            <img
              src={LandImg1}
              alt="Baltra appliance"
              className="baltra-img baltra-img--right baltra-float-c"
              loading="lazy"
            />
          </div>
          <div className="baltra-stage" aria-hidden="true" />
        </section>

        {/* ══ CTA ══ */}
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

        {/* Scroll indicator */}
        <div className="baltra-scroll-ind" aria-hidden="true">
          <span>Scroll</span>
          <div className="baltra-scroll-line" />
        </div>
      </div>

      {showModal && <InfoLayoutModal setConfirmed={setConfirmed} />}
    </>
  );
};

export default BaltraLandingPage;
