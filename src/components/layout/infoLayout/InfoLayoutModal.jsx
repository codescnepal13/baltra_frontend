import { FaGlobe } from "react-icons/fa";
import { HiDeviceMobile } from "react-icons/hi";

const InfoLayoutModal = ({ setConfirmed }) => {
  const handleOptionClick = (option) => {
    if (option === "app") {
      window.open("https://play.google.com/store", "_blank");
    }
    // "web" just stays on current page — no action needed
    setConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl px-8 py-9 text-center
                   transition-transform duration-500 ease-out scale-100"
        style={{
          background: "rgba(255, 255, 255, 0.09)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {/* Icon badge */}
        <div
          className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.13)",
            border: "1px solid rgba(255,255,255,0.22)",
          }}
        >
          <span style={{ fontSize: 26 }}>⚡</span>
        </div>

        {/* Title */}
        <h2
          className="font-gothamNarrow font-bold text-white tracking-wide mb-2"
          style={{ fontSize: "clamp(20px, 5vw, 26px)" }}
        >
          Explore Baltra
        </h2>

        {/* Description */}
        <p
          className="font-gothamNarrow text-sm leading-relaxed mb-7"
          style={{ color: "rgba(255, 225, 215, 0.72)" }}
        >
          Choose how you'd like to experience our world of premium home
          appliances.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {/* Primary — App */}
          <button
            onClick={() => handleOptionClick("app")}
            className="
    w-full py-3.5 rounded-full
    font-gothamNarrow font-semibold text-sm tracking-wide
    transition-all duration-200
    hover:-translate-y-0.5 active:scale-95
    flex items-center justify-center gap-2
  "
            style={{
              background: "white",
              color: "#7A0A0A",
              boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
            }}
          >
            <HiDeviceMobile className="text-lg" />
            <span>Launch in App</span>
          </button>

          {/* Secondary — Web */}
          <button
            onClick={() => handleOptionClick("web")}
            className="
    w-full py-3.5 rounded-full
    font-gothamNarrow text-sm tracking-wide
    transition-all duration-200
    hover:bg-white/20 active:scale-95
    flex items-center justify-center gap-2
  "
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.88)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <FaGlobe className="text-sm" />
            <span>Open in Web Browser</span>
          </button>
        </div>

        {/* Tip */}
        <p
          className="mt-5 font-gothamNarrow text-xs tracking-wide"
          style={{ color: "rgba(255,190,170,0.45)" }}
        >
          ✦ The app unlocks full 3D product visualization
        </p>
      </div>
    </div>
  );
};

export default InfoLayoutModal;
