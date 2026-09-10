import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const MILESTONES = [
  {
    year: "1994",
    text: "Our story began in Kathmandu with a humble collection of glass cups and a mixer grinder — the first sparks of what would become Baltra.",
  },
  {
    year: "1997",
    text: "Baltra's reach extended to major cities across Nepal, marking the beginning of our widespread national presence.",
  },
  {
    year: "1999",
    text: "We introduced gold cups and platters, adding a touch of sophistication and cultural resonance to our product line.",
  },
  {
    year: "2001",
    text: "With 500 retailers and 23 distributors, our distribution network expanded — bringing our products closer to customers everywhere.",
  },
  {
    year: "2005",
    text: "Gas geysers, oven toasters, and sandwich makers joined our portfolio, broadening our reach into everyday household needs.",
  },
  {
    year: "2013",
    text: "Baltra became a registered brand in more than 40 countries worldwide, solidifying our growing international presence.",
  },
  {
    year: "2017",
    text: "We began exporting to Asian countries, establishing ourselves as a confident global player.",
  },
  {
    year: "2018",
    text: "Participation in the world's largest Canton Fair in China showcased our commitment to innovation and introduced big home appliances to the market.",
  },
  {
    year: "2023",
    text: "We proudly celebrated 29 years of operations in Nepal — a testament to our enduring commitment to quality and customer trust.",
  },
  {
    year: "2025",
    text: "Baltra expanded its smart home appliances lineup, launching energy-efficient products designed for modern Nepali households and growing export markets.",
  },
  {
    year: "2026",
    text: "Marking over three decades of innovation, Baltra continues to lead the home appliance market in Nepal with a renewed focus on sustainability and technology.",
  },
];

const TimeLine = () => {
  const scrollRef = useRef(null);
  const railRef = useRef(null);
  const draggingRail = useRef(false);

  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollPct, setScrollPct] = useState(0); // 0 → 1

  const updateMax = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setMaxScroll(Math.max(0, el.scrollWidth - el.clientWidth));
  }, []);

  useEffect(() => {
    updateMax();
    const el = scrollRef.current;
    const ro = new ResizeObserver(updateMax);
    if (el) ro.observe(el);
    window.addEventListener("resize", updateMax);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMax);
    };
  }, [updateMax]);

  // Keep the rail handle synced while the user scrolls/swipes the cards
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || maxScroll <= 0) return;
    setScrollPct(Math.max(0, Math.min(1, el.scrollLeft / maxScroll)));
  };

  // Let the rail also drive the scroll (mouse or touch, via Pointer Events)
  const setScrollFromClientX = (clientX) => {
    const rail = railRef.current;
    const el = scrollRef.current;
    if (!rail || !el) return;
    const rect = rail.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    el.scrollLeft = pct * maxScroll;
    setScrollPct(pct);
  };

  const onRailPointerDown = (e) => {
    draggingRail.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setScrollFromClientX(e.clientX);
  };
  const onRailPointerMove = (e) => {
    if (!draggingRail.current) return;
    setScrollFromClientX(e.clientX);
  };
  const onRailPointerUp = () => {
    draggingRail.current = false;
  };

  return (
    <div className="font-gothamNarrow w-full select-none">
      {/* ── Scrollable card track (native scroll = smooth on all devices) ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
      flex gap-4 sm:gap-6
      overflow-x-auto scroll-smooth
      snap-x snap-mandatory
      px-4 sm:px-8 lg:px-24 py-2
      [-ms-overflow-style:none] [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
      "
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
      >
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="
              flex-none snap-center
              w-[80%] xs:w-[70%] sm:w-[320px] lg:w-[360px]
              bg-white/90 sm:bg-white/80 backdrop-blur-sm
              border border-white/60
              rounded-2xl
              p-5 sm:p-6
              shadow-md sm:shadow-none
            "
          >
            <div className="text-[#F02323] text-3xl sm:text-4xl font-bold leading-none mb-3">
              {m.year}
            </div>
            <p className="text-[#363232] text-sm sm:text-base leading-relaxed">
              {m.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Scroll Rail (now works on mobile too, drives the same scroll container) ── */}
      <div className="flex items-center gap-0 px-4 sm:px-8 lg:px-24 mt-5 sm:mt-6">
        <div
          ref={railRef}
          onPointerDown={onRailPointerDown}
          onPointerMove={onRailPointerMove}
          onPointerUp={onRailPointerUp}
          onPointerCancel={onRailPointerUp}
          className="relative flex-1 h-[3px] py-3 -my-3 cursor-pointer"
          style={{ touchAction: "none" }}
        >
          {/* Dotted background */}
          <div
            className="absolute inset-y-0 left-0 right-0 top-1/2 -translate-y-1/2 h-[3px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #8B8686 0, #8B8686 4px, transparent 4px, transparent 10px)",
            }}
          />
          {/* Progress fill */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[3px] bg-[#F02323] rounded-full"
            style={{ width: `${scrollPct * 100}%` }}
          />
          {/* Draggable handle */}
          <div
            className="
              absolute top-1/2 -translate-y-1/2 -translate-x-1/2
              w-[22px] h-[22px]
              bg-white border-[3px] border-[#F02323]
              rounded-full
              flex items-center justify-center
              shadow-sm pointer-events-none
            "
            style={{ left: `${scrollPct * 100}%` }}
          >
            <div className="w-[9px] h-[9px] bg-[#F02323] rounded-full" />
          </div>
        </div>

        {/* Arrow cap */}
        <div className="ml-2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[10px] border-l-[#8B8686] flex-shrink-0" />
      </div>

      {/* ── Mobile swipe hint ── */}
      <p className="sm:hidden text-center text-xs text-[#8B8686] mt-3 tracking-wide">
        Swipe to explore
      </p>
    </div>
  );
};

export default TimeLine;
