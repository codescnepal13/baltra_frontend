import { useEffect, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import RepairServiceImg from "../../../assets/images/RepairServicesImg.png";
import RobustService from "../../../assets/images/RobustInvestoryImg.png";
import ServiceCenter from "../../../assets/images/serviceCenterImg.png";
import WorldClassService from "../../../assets/images/worldClassImg.png";

const SERVICES = [
  {
    src: WorldClassService,
    title: "World Class Services",
    description:
      "At BALTRA, we are dedicated to delivering world-class service and trusted advice for all your home and kitchen appliance needs. From your first interaction with us, expect exceptional support and expertise that goes above and beyond.",
  },
  {
    src: ServiceCenter,
    title: "Service Centers and Technicians",
    description:
      "We ensure quick support through our central service center in Teku, Kathmandu, and 55 distributor points across the valley. With 44 expert technicians, we provide fast and reliable repairs, typically within 2–3 days.",
  },
  {
    src: RepairServiceImg,
    title: "Repair Services",
    description:
      "We prioritize the quality of our products and offer quick repair services for any warranty-covered issues. Our skilled technicians aim to complete repairs within 2–3 days, restoring your appliance to peak condition.",
  },
  {
    src: RobustService,
    title: "Robust Inventory",
    description:
      "Our well-managed, automated inventory ensures quick access to spare parts and accessories. Visit our Teku service center in Kathmandu for seamless support and timely repairs — so your appliances run smoothly again.",
  },
];

const injectStyles = () => {
  if (document.getElementById("sp-styles")) return;
  const style = document.createElement("style");
  style.id = "sp-styles";
  style.textContent = `
    /* ── Timeline line ── */
    .vertical-timeline::before {
      background: #e0e0e0 !important;
      width: 3px !important;
    }

    /* ── Hide default icons ── */
    .vertical-timeline-element-icon {
      display: none !important;
    }

    /* ── Arrow ── */
    .vertical-timeline-element-content-arrow {
      border-right-color: #FF0000 !important;
      animation: arrowSlide 0.4s 0.3s cubic-bezier(0.4,0,0.2,1) both !important;
    }
    @keyframes arrowSlide {
      from { opacity: 0; transform: translateX(-8px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* ── Card base ── */
    .sp-card {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1),
                  transform 0.6s cubic-bezier(0.4,0,0.2,1),
                  box-shadow 0.3s ease;
    }
    .sp-card.sp-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .sp-card:hover {
      box-shadow: 0 12px 40px rgba(255,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06) !important;
    }

    /* ── Image zoom ── */
    .sp-img {
      transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
    }
    .sp-card:hover .sp-img { transform: scale(1.04); }

    /* ── Red accent bar ── */
    .sp-accent {
      width: 0; height: 3px;
      background: #FF0000; border-radius: 2px;
      transition: width 0.5s 0.2s cubic-bezier(0.4,0,0.2,1);
    }
    .sp-card.sp-visible .sp-accent { width: 48px; }

    /* ── Step badge ── */
    .sp-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: #fff0f0; color: #cc0000;
      font-size: 12px; font-weight: 600;
      padding: 3px 10px; border-radius: 999px;
      border: 1px solid #ffd0d0; margin-bottom: 10px;
    }
    .sp-badge-dot {
      width: 6px; height: 6px;
      background: #FF0000; border-radius: 50%; flex-shrink: 0;
    }

    /* ── Stagger delays ── */
    .sp-card[data-idx="0"] { transition-delay: 0.05s; }
    .sp-card[data-idx="1"] { transition-delay: 0.12s; }
    .sp-card[data-idx="2"] { transition-delay: 0.10s; }
    .sp-card[data-idx="3"] { transition-delay: 0.15s; }

    /* ── Scroll dot ── */
    .sp-scroll-dot {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 20px; height: 20px;
      border-radius: 50%;
      background: #FF0000;
      border: 3px solid #fff;
      box-shadow: 0 0 0 3px #FF0000, 0 0 16px rgba(255,0,0,0.4);
      z-index: 10;
      pointer-events: none;
      transition: top 0.12s cubic-bezier(0.4,0,0.2,1);
    }
    .sp-fill-line {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      top: 0;
      background: #FF0000;
      z-index: 5;
      pointer-events: none;
      transition: height 0.12s cubic-bezier(0.4,0,0.2,1);
    }
    .sp-scroll-dot::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(255,0,0,0.3);
      animation: dotPulse 2s ease-in-out infinite;
    }
    @keyframes dotPulse {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50%       { transform: scale(1.5); opacity: 0; }
    }

    /* ── Mobile: single column, centre the line ── */
    @media (max-width: 1169px) {
      .vertical-timeline::before {
        left: 18px !important;
      }
      .sp-scroll-dot {
        left: 18px !important;
        transform: translateX(-50%) !important;
      }
      .sp-fill-line {
        left: 18px !important;
        transform: translateX(-50%) !important;
      }
      .vertical-timeline-element {
        margin: 1.5em 0 !important;
      }
      .vertical-timeline-element-content {
        margin-left: 44px !important;
        width: calc(100% - 44px) !important;
        padding: 0 !important;
      }
      .vertical-timeline-element-content-arrow {
        top: 20px !important;
        left: -8px !important;
        border-right-color: #FF0000 !important;
      }
    }

    /* ── Fix content box width on all sizes ── */
    .vertical-timeline-element-content {
      box-shadow: none !important;
      border-radius: 16px !important;
      overflow: hidden !important;
      padding: 0 !important;
    }

    /* ── Image responsive heights ── */
    .sp-img-wrap {
      width: 100%;
      overflow: hidden;
      background: #fafafa;
      border-bottom: 1px solid #f0f0f0;
    }
    .sp-img-wrap img {
      width: 100%;
      height: clamp(140px, 22vw, 208px);
      object-fit: contain;
      padding: clamp(12px, 3vw, 24px) clamp(16px, 4vw, 32px);
      display: block;
    }

    /* ── Card content padding ── */
    .sp-content-body {
      padding: clamp(14px, 3vw, 24px);
    }

    /* ── Title font size ── */
    .sp-title {
      font-size: clamp(1rem, 2.5vw, 1.375rem);
      line-height: 1.3;
    }

    /* ── Description font size ── */
    .sp-desc {
      font-size: clamp(0.8rem, 1.8vw, 0.975rem);
      line-height: 1.7;
    }
  `;
  document.head.appendChild(style);
};

const ServicePromises = () => {
  const cardRefs = useRef([]);
  const dotRef = useRef(null);
  const fillRef = useRef(null);
  const timelineWrapRef = useRef(null);

  useEffect(() => {
    injectStyles();

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("sp-visible");
        });
      },
      { threshold: 0.15 },
    );
    cardRefs.current.forEach((el) => el && cardObserver.observe(el));

    const handleScroll = () => {
      const wrap = timelineWrapRef.current;
      const dot = dotRef.current;
      const fill = fillRef.current;
      if (!wrap || !dot || !fill) return;

      const rect = wrap.getBoundingClientRect();
      const wrapTop = rect.top;
      const wrapHeight = rect.height;
      const viewH = window.innerHeight;

      const scrolled = Math.max(
        0,
        Math.min(1, (viewH * 0.5 - wrapTop) / wrapHeight),
      );

      const newTop = scrolled * wrapHeight;
      dot.style.top = `${newTop}px`;
      fill.style.height = `${newTop}px`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cardObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      aria-labelledby="service-promises-heading"
      className="text-black mt-8 bg-[#f3f4f5]"
      style={{ padding: "clamp(16px, 4vw, 32px)" }}
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h2
          id="service-promises-heading"
          className="text-[#202D31] font-bold font-gothamNarrow"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
        >
          Our Service Promises
        </h2>
        <p
          className="text-[#444] font-normal font-gothamNarrow tracking-normal pt-2"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.5rem)" }}
        >
          Service Promises: Our Commitment to Excellence
        </p>
        <div className="mx-auto mt-4 w-16 h-[3px] rounded-full bg-[#FF0000]" />
      </div>

      {/* Timeline wrapper */}
      <div ref={timelineWrapRef} className="relative">
        <div ref={dotRef} className="sp-scroll-dot" style={{ top: 0 }} />
        <div ref={fillRef} className="sp-fill-line" style={{ height: 0 }} />

        <VerticalTimeline>
          {SERVICES.map((service, index) => (
            <VerticalTimelineElement
              key={`service-${index}`}
              contentStyle={{
                background: "white",
                color: "black",
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                padding: "0",
                overflow: "hidden",
              }}
              contentArrowStyle={{ borderRight: "8px solid #FF0000" }}
              iconStyle={{
                background: "transparent",
                boxShadow: "none",
                width: "0px",
                height: "0px",
              }}
            >
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="sp-card"
                data-idx={index}
              >
                {/* Image */}
                <div className="sp-img-wrap">
                  <img
                    src={service.src}
                    alt={service.title}
                    className="sp-img"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="sp-content-body">
                  <div className="sp-badge">
                    <span className="sp-badge-dot" />
                    Step {index + 1} of {SERVICES.length}
                  </div>
                  <div className="sp-accent mb-3" />
                  <h3 className="sp-title text-[#202D31] font-bold font-gothamNarrow mb-3">
                    {service.title}
                  </h3>
                  <p className="sp-desc text-[#555] font-normal font-gothamNarrow leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default ServicePromises;
