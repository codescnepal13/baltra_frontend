import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaBell,
  FaRegClock,
  FaScrewdriverWrench,
  FaXmark,
} from "react-icons/fa6";

const WarrantyComingSoon = ({ isOpen, onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Always keep the latest onClose without re-running the effect below
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onCloseRef.current?.()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="warranty-coming-soon-title"
            aria-describedby="warranty-coming-soon-desc"
            className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[22rem] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:max-w-sm md:max-w-md"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.95 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button (stays fixed while the body scrolls) */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-8 sm:w-8"
            >
              <FaXmark className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex shrink-0 flex-col items-center bg-gradient-to-r from-[#ED1C24] to-[#831010] px-6 pb-6 pt-8 sm:pb-8 sm:pt-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10 sm:h-16 sm:w-16">
                <FaRegClock className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>
            </div>

            {/* Body (scrolls on short screens) */}
            <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto overscroll-contain px-5 pb-6 pt-5 text-center sm:px-6 sm:pb-7 sm:pt-6">
              <span className="mb-3 rounded-full bg-red-50 px-3 py-1 font-gothamNarrow text-[11px] font-semibold uppercase tracking-widest text-[#ED1C24] sm:text-xs">
                Coming Soon
              </span>

              <h2
                id="warranty-coming-soon-title"
                className="font-gothamNarrow text-xl font-bold text-[#1A1A1A] sm:text-2xl"
              >
                Extended Warranty
              </h2>

              <p
                id="warranty-coming-soon-desc"
                className="mt-2 font-gothamNarrow text-sm leading-relaxed text-gray-500"
              >
                We're working on bringing extended warranty to Baltra. It will
                be available very soon. Stay tuned!
              </p>

              {/* Team status */}
              <div className="mt-4 flex w-full items-start gap-3 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3 text-left sm:mt-5">
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                  <FaScrewdriverWrench className="h-3.5 w-3.5 text-[#ED1C24]" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-gothamNarrow text-sm font-semibold text-[#1A1A1A]">
                      Our team is working on it
                    </span>

                    <span
                      className="relative flex h-2 w-2 shrink-0"
                      aria-hidden="true"
                    >
                      {!shouldReduceMotion && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ED1C24] opacity-60" />
                      )}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ED1C24]" />
                    </span>
                  </div>

                  <p className="mt-0.5 font-gothamNarrow text-xs leading-relaxed text-gray-500">
                    In development. We're making sure it's reliable and easy to
                    use before launch.
                  </p>
                </div>
              </div>

              {/* Stay updated */}
              <div className="mt-3 flex w-full items-start gap-2 rounded-lg bg-red-50/60 px-3 py-2.5 text-left">
                <FaBell
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#ED1C24]"
                  aria-hidden="true"
                />
                <p className="font-gothamNarrow text-xs leading-relaxed text-[#1A1A1A]">
                  <span className="font-semibold">Stay updated:</span> we'll
                  announce it here and on our official channels as soon as it
                  goes live.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 w-full shrink-0 rounded-md bg-[#ED1C24] py-3 font-gothamNarrow text-sm font-medium text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#ED1C24] hover:to-[#831010] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1C24] focus-visible:ring-offset-2 sm:mt-6"
              >
                GOT IT
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default WarrantyComingSoon;
