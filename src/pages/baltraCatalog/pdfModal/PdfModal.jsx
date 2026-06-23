import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import MyBook from "./MyBook";

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   catalog: { catalogue_type: string, file: string } | null
 * }} props
 */
const PdfModal = ({ isOpen, onClose, catalog }) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          style={{ backgroundColor: "rgba(4, 14, 20, 0.85)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
          aria-label="Catalog viewer"
        >
          {/* Backdrop blur layer */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ zIndex: -1 }}
          />

          <motion.div
            key="modal"
            className="relative w-full"
            style={{
              maxWidth: "820px",
              background:
                "linear-gradient(160deg, #0D2233 0%, #071824 60%, #040E14 100%)",
              border: "1px solid rgba(74, 122, 138, 0.25)",
              borderRadius: "16px",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(74,122,138,0.1)",
            }}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(74, 122, 138, 0.15)" }}
            >
              <div className="flex items-center gap-3">
                {/* Decorative accent dots */}
                <div className="flex gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: "#4A7A8A", opacity: 0.5 }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: "#90C4D0", opacity: 0.3 }}
                  />
                </div>
                <p
                  className="text-sm font-medium tracking-widest uppercase"
                  style={{ color: "#6A90A0", letterSpacing: "0.12em" }}
                >
                  {/* Show the specific catalog name when available */}
                  {catalog?.catalogue_type ?? "Product Catalog"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p
                  className="hidden sm:block text-xs"
                  style={{ color: "#3A5060" }}
                >
                  Drag or tap pages to navigate
                </p>
                <button
                  onClick={onClose}
                  aria-label="Close catalog"
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
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

            {/* Book Content — only mount MyBook when the modal is open */}
            <div className="p-4 sm:p-6">
              {isOpen && catalog?.file && <MyBook pdfUrl={catalog.file} />}
            </div>

            {/* Subtle bottom glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(74,122,138,0.4), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PdfModal;
