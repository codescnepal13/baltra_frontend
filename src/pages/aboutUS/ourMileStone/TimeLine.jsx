import { animate, motion, useMotionValue, useTransform } from "framer-motion";
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
  // ✅ New entries
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
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const containerRef = useRef(null);

  const scrollX = useMotionValue(0); // 0 = leftmost, positive = scrolled right
  const [maxScroll, setMaxScroll] = useState(0);
  const [railWidth, setRailWidth] = useState(0);

  // Handle position (0 → railWidth)
  const handleX = useTransform(scrollX, [0, maxScroll], [0, railWidth]);
  // Progress bar width percentage
  const progressWidth = useTransform(scrollX, [0, maxScroll], ["0%", "100%"]);
  // Track translates opposite to scroll
  const trackX = useTransform(scrollX, (v) => -v);

  const updateDimensions = useCallback(() => {
    if (!trackRef.current || !containerRef.current || !railRef.current) return;
    const trackScrollWidth = trackRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;
    setMaxScroll(Math.max(0, trackScrollWidth - containerWidth));
    setRailWidth(railRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateDimensions]);

  // Clamp scroll value
  const clampScroll = useCallback(
    (val) => Math.max(0, Math.min(val, maxScroll)),
    [maxScroll],
  );

  // --- Track drag ---
  const handleTrackDragEnd = (_, info) => {
    const current = scrollX.get();
    // Momentum: add velocity-based offset
    const projected = current - info.velocity.x * 0.08;
    animate(scrollX, clampScroll(projected), {
      type: "spring",
      stiffness: 120,
      damping: 25,
    });
  };

  // --- Rail handle drag ---
  const handleRailDrag = (_, info) => {
    if (!railWidth) return;
    const pct = Math.max(0, Math.min(1, info.point.x / railWidth));
    scrollX.set(clampScroll(pct * maxScroll));
  };

  return (
    <div className="font-gothamNarrow w-full select-none">
      {/* ── Track ── */}
      <div ref={containerRef} className="w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.05}
          onDrag={(_, info) => {
            // Keep scrollX in sync while dragging
            scrollX.set(clampScroll(-info.point.x + maxScroll / 2));
          }}
          onDragEnd={handleTrackDragEnd}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-6 px-4 sm:px-8 lg:px-24 pb-2 cursor-grab"
        >
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="
                flex-none w-[280px] sm:w-[320px] lg:w-[360px]
                bg-white/80 backdrop-blur-sm
                border border-white/60
                rounded-2xl
                p-5 sm:p-6
                pointer-events-none
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
        </motion.div>
      </div>

      {/* ── Scroll Rail ── */}
      <div className="hidden sm:flex items-center gap-0 px-4 sm:px-8 lg:px-24 mt-6">
        {/* Draggable handle */}
        <div className="relative" style={{ width: 0 }}>
          <motion.div
            style={{ x: handleX }}
            drag="x"
            dragConstraints={{ left: 0, right: railWidth }}
            dragElastic={0}
            onDrag={handleRailDrag}
            whileTap={{ scale: 1.15, cursor: "grabbing" }}
            className="
              absolute -top-[11px] -left-[11px]
              w-[22px] h-[22px]
              bg-white border-[3px] border-[#F02323]
              rounded-full
              flex items-center justify-center
              cursor-grab z-10
              shadow-sm
            "
          >
            <div className="w-[9px] h-[9px] bg-[#F02323] rounded-full" />
          </motion.div>
        </div>

        {/* Rail track */}
        <div ref={railRef} className="flex-1 relative h-[3px]">
          {/* Dotted background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #8B8686 0, #8B8686 4px, transparent 4px, transparent 10px)",
            }}
          />
          {/* Progress fill */}
          <motion.div
            style={{ width: progressWidth }}
            className="absolute inset-y-0 left-0 bg-[#F02323] rounded-full"
          />
        </div>

        {/* Arrow cap */}
        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[10px] border-l-[#8B8686] flex-shrink-0" />
      </div>

      {/* ── Mobile scroll hint ── */}
      <p className="sm:hidden text-center text-xs text-[#8B8686] mt-3 tracking-wide">
        Swipe to explore
      </p>
    </div>
  );
};

export default TimeLine;
