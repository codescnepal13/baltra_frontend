import { useEffect } from "react";

/**
 * Locks background scroll while `active` is true.
 *
 * Without this, the page behind a fixed-position modal can still scroll
 * (trackpad/mouse-wheel momentum keeps going even though it's hidden under
 * the overlay), so the instant the modal closes the page "jumps" to
 * wherever it silently scrolled to — that's the flicker on open and close.
 *
 * It also pads the right edge by the scrollbar's width while locked, so
 * hiding the scrollbar doesn't shift the page content sideways either.
 */
const useScrollLock = (active) => {
  useEffect(() => {
    if (!active) return undefined;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [active]);
};

export default useScrollLock;
