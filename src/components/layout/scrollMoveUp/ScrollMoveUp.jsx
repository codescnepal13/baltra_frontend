import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollMoveUp = () => {
  const [isVisible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    const heightToHidden = 250;
    const winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    setVisible(winScroll > heightToHidden);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes baltra-ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes baltra-fadeUp {
          from { opacity: 0; transform: translateY(16px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes baltra-fadeDown {
          from { opacity: 1; transform: translateY(0)   scale(1); }
          to   { opacity: 0; transform: translateY(16px) scale(0.85); }
        }
        .baltra-scroll-btn {
          animation: baltra-fadeUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .baltra-scroll-btn.hiding {
          animation: baltra-fadeDown 0.25s ease-in forwards;
        }
        .baltra-ping-ring {
          animation: baltra-ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {isVisible && (
        <div
          onClick={goToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="baltra-scroll-btn fixed bottom-8 right-6 z-50 hidden lg:flex items-center justify-center cursor-pointer"
          style={{ width: 44, height: 44 }}
          aria-label="Scroll to top"
          role="button"
        >
          {/* Pulse ring — only on hover */}
          {isHovered && (
            <span
              className="baltra-ping-ring absolute inset-0 rounded-full"
              style={{ background: "#E91C1C", opacity: 0.35 }}
            />
          )}

          {/* Main button */}
          <div
            className="relative flex items-center justify-center w-full h-full rounded-full shadow-lg transition-all duration-200"
            style={{
              background: isHovered
                ? "#c91515" // slightly darker on hover
                : "#E91C1C",
              boxShadow: isHovered
                ? "0 6px 20px rgba(233,28,28,0.55)"
                : "0 4px 14px rgba(233,28,28,0.35)",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            {/* Subtle top-gloss */}
            <span
              className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                width: "60%",
                height: "35%",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)",
              }}
            />

            <FaArrowUp
              className="text-white"
              style={{
                fontSize: 15,
                transition: "transform 0.2s ease",
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollMoveUp;
