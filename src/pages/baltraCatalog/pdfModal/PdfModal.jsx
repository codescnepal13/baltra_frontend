import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import MyBook from "./MyBook";

const PdfModal = ({ isOpen, onClose, catalog }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5"
          style={{ backgroundColor: "rgba(4, 14, 20, 0.88)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
          aria-label="Catalog viewer"
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ zIndex: -1 }}
          />

          <motion.div
            key="modal"
            className="relative w-full flex flex-col"
            style={{
              maxWidth: "1180px",
              maxHeight: "98dvh",
              background:
                "linear-gradient(160deg, #0D2233 0%, #071824 60%, #040E14 100%)",
              border: "1px solid rgba(74, 122, 138, 0.25)",
              borderRadius: "16px",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(74,122,138,0.08)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header — tighter on phones so the book gets the space */}
            <div
              className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 shrink-0"
              style={{ borderBottom: "1px solid rgba(74, 122, 138, 0.15)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="hidden sm:flex gap-1.5 shrink-0">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#4A7A8A", opacity: 0.5 }}
                  />
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#90C4D0", opacity: 0.3 }}
                  />
                </div>
                <p
                  className="text-xs font-medium tracking-widest uppercase font-gothamNarrow truncate"
                  style={{ color: "#6A90A0", letterSpacing: "0.12em" }}
                >
                  {catalog?.catalogue_type ?? "Product Catalog"}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-4">
                <p
                  className="hidden sm:block text-xs"
                  style={{ color: "#3A5060" }}
                >
                  Drag or tap pages to navigate
                </p>
                <button
                  onClick={onClose}
                  aria-label="Close catalog"
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
                  style={{
                    border: "1px solid rgba(74, 122, 138, 0.3)",
                    color: "#6A90A0",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(74,122,138,0.15)";
                    e.currentTarget.style.color = "#90C4D0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6A90A0";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1l12 12M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/*
              Book body — overflow: hidden (NOT auto/scroll).
              MyBook is self-contained and sized to fit; it must never cause
              this container to scroll or show a scrollbar.
              Padding is intentionally small on phones — every pixel here is
              a pixel the page image doesn't get.
            */}
            <div
              className="flex-1 min-h-0 p-2 sm:p-4 flex items-center justify-center"
              style={{ overflow: "hidden" }}
            >
              {isOpen && catalog?.file && <MyBook pdfUrl={catalog.file} />}
            </div>

            {/* Bottom glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(74,122,138,0.35), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PdfModal;
