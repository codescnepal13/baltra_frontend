import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import HTMLFlipBook from "react-pageflip";
import flipSound from "../../../assets/videos/flipSound.mp3";

// Vite's `?url` import resolves to the final built asset URL at build time,
// with correct Content-Type served automatically — avoids both the CDN
// version-availability issue and the dynamic-import MIME issue on Android.
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// ─── Render one PDF page → PNG data-URL, scaled for maximum sharpness ────────
async function renderPageToDataUrl(pdfDoc, pageNum) {
  const page = await pdfDoc.getPage(pageNum);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  // Higher scale = crisper text (capped at 4× to avoid canvas memory limits)
  const scale = Math.min(4, Math.max(2.5, dpr * 2));
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext("2d"), viewport })
    .promise;
  return {
    dataUrl: canvas.toDataURL("image/png"),
    aspectRatio: viewport.width / viewport.height,
  };
}

// ─── Layout constants ─────────────────────────────────────────────────────────
// Space reserved below the book for the HUD (counter + progress bar).
// ─── Layout constants ─────────────────────────────────────────────────────────
const RESERVE_H = 56; // was 48
const ARROW_GUTTER = 44; // was 56 — less wasted side space
const ARROW_GUTTER_MOBILE = 32; // was 40

const isDesktopViewport = () => window.matchMedia("(min-width: 768px)").matches;

// ─── Fit-to-box book sizing ───────────────────────────────────────────────────
function calcBookSize(containerEl, aspectRatio) {
  if (!containerEl) return { pageW: 400, pageH: 530 }; // bigger fallback

  const box = containerEl.parentElement || containerEl;
  const isMd = isDesktopViewport();
  const gutter = isMd ? ARROW_GUTTER : ARROW_GUTTER_MOBILE;

  const availW = (box.clientWidth || 600) - gutter * 2;
  const availH = box.clientHeight || 700;
  const bookAvailH = Math.max(300, availH - RESERVE_H); // was 200

  if (isMd) {
    // Use 96% of available width (was implicitly less)
    const usableW = availW * 0.96; // ← NEW: use more width
    const hIfWidthBound = usableW / 2 / aspectRatio;
    let pageW, pageH;
    if (hIfWidthBound <= bookAvailH) {
      pageW = Math.floor(usableW / 2);
      pageH = Math.floor(hIfWidthBound);
    } else {
      pageH = Math.floor(bookAvailH);
      pageW = Math.floor(pageH * aspectRatio);
    }
    return { pageW, pageH };
  }

  // Mobile: use 98% of width
  const usableW = availW * 0.98; // ← NEW
  const hIfWidthBound = usableW / aspectRatio;
  let pageW, pageH;
  if (hIfWidthBound <= bookAvailH) {
    pageW = Math.floor(usableW);
    pageH = Math.floor(hIfWidthBound);
  } else {
    pageH = Math.floor(bookAvailH);
    pageW = Math.floor(pageH * aspectRatio);
  }
  return { pageW, pageH };
}

// ─── MyBook ───────────────────────────────────────────────────────────────────
const MyBook = ({ pdfUrl }) => {
  const flipBookRef = useRef(null);
  const audioRef = useRef(new Audio(flipSound));
  const containerRef = useRef(null);
  const aspectRatioRef = useRef(null);

  const [pages, setPages] = useState([]);
  const [bookSize, setBookSize] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(isDesktopViewport());

  // ── Load & render PDF ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!pdfUrl) return;
    let cancelled = false;

    const load = async () => {
      setPages([]);
      setBookSize(null);
      setLoadProgress(0);
      setLoadError(null);
      setCurrentPage(0);
      aspectRatioRef.current = null;

      try {
        const pdfDoc = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        if (cancelled) return;

        const total = pdfDoc.numPages;
        const rendered = [];

        for (let i = 1; i <= total; i++) {
          if (cancelled) return;
          const { dataUrl, aspectRatio } = await renderPageToDataUrl(pdfDoc, i);
          rendered.push(dataUrl);

          if (i === 1) {
            aspectRatioRef.current = aspectRatio;
            setBookSize(calcBookSize(containerRef.current, aspectRatio));
          }

          setLoadProgress(Math.round((i / total) * 100));
          await new Promise((r) => requestAnimationFrame(r));
        }

        if (!cancelled) setPages(rendered);
      } catch (err) {
        if (!cancelled) {
          console.error("[MyBook] PDF error:", err);
          setLoadError(
            err?.message?.includes("fetch")
              ? "Could not fetch the PDF — check CORS headers on the Django server."
              : `PDF error: ${err.message}`,
          );
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // ── Resize observer — keep book fit to its box ────────────────────────────
  useEffect(() => {
    if (!aspectRatioRef.current || !containerRef.current) return;

    let frame = null;
    const recalc = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIsDesktop(isDesktopViewport());
        if (containerRef.current && aspectRatioRef.current) {
          setBookSize(
            calcBookSize(containerRef.current, aspectRatioRef.current),
          );
        }
      });
    };

    const box = containerRef.current.parentElement;
    let ro = null;
    if (box && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(recalc);
      ro.observe(box);
    }
    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pages.length > 0]);

  // ── Controls ───────────────────────────────────────────────────────────────
  const totalPages = pages.length;
  const isAtEnd = currentPage >= totalPages - 1;
  const isAtStart = currentPage === 0;

  const playFlip = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  }, []);

  const handleFlip = useCallback((e) => setCurrentPage(e.data), []);

  const handleNext = useCallback(() => {
    if (!flipBookRef.current || isAtEnd) return;
    flipBookRef.current.pageFlip().flipNext();
    if (currentPage < totalPages - 2) playFlip();
  }, [isAtEnd, currentPage, totalPages, playFlip]);

  const handlePrev = useCallback(() => {
    if (!flipBookRef.current || isAtStart) return;
    flipBookRef.current.pageFlip().flipPrev();
    playFlip();
  }, [isAtStart, playFlip]);

  const progressPercent =
    totalPages > 1 ? Math.round((currentPage / (totalPages - 1)) * 100) : 0;

  // Floating arrow buttons — larger on desktop for a premium feel
  const arrowBtnStyle = (side, disabled) => ({
    position: "absolute",
    [side]: isDesktop ? 6 : 2,
    top: "50%",
    transform: "translateY(-50%)",
    width: isDesktop ? 52 : 40,
    height: isDesktop ? 52 : 40,
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(7, 24, 36, 0.65)",
    border: "1px solid rgba(144, 196, 208, 0.3)",
    backdropFilter: "blur(6px)",
    color: disabled ? "#3A5060" : "#90C4D0",
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    zIndex: 20,
    transition: "background-color 0.2s, border-color 0.2s, transform 0.15s",
  });

  // ── Error ──────────────────────────────────────────────────────────────────
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
        <span className="text-4xl opacity-30">⚠️</span>
        <p className="text-base font-medium" style={{ color: "#90C4D0" }}>
          {loadError}
        </p>
      </div>
    );
  }

  // ── Loading ring ───────────────────────────────────────────────────────────
  const r = 32;
  const circ = 2 * Math.PI * r;

  if (pages.length === 0) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col items-center justify-center gap-5 py-20"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle
            cx="40"
            cy="40"
            r={r}
            stroke="rgba(74,122,138,0.15)"
            strokeWidth="5"
          />
          <circle
            cx="40"
            cy="40"
            r={r}
            stroke="#4A7A8A"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${(loadProgress / 100) * circ} ${circ}`}
            transform="rotate(-90 40 40)"
            style={{ transition: "stroke-dasharray 0.35s ease" }}
          />
        </svg>
        <p
          className="text-sm font-semibold tracking-widest uppercase font-gothamNarrow"
          style={{ color: "#6A90A0" }}
        >
          {loadProgress < 100
            ? `Rendering pages… ${loadProgress}%`
            : "Preparing flipbook…"}
        </p>
      </div>
    );
  }

  const { pageW, pageH } = bookSize ?? { pageW: 320, pageH: 426 };
  const bookDisplayWidth = isDesktop ? pageW * 2 : pageW;

  // ── Flipbook ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center gap-3"
    >
      {/* Book stage */}
      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
        <button
          onClick={handlePrev}
          disabled={isAtStart}
          aria-label="Previous page"
          style={arrowBtnStyle("left", isAtStart)}
          onMouseEnter={(e) => {
            if (isAtStart) return;
            e.currentTarget.style.background = "rgba(74,122,138,0.4)";
            e.currentTarget.style.borderColor = "#90C4D0";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(7, 24, 36, 0.65)";
            e.currentTarget.style.borderColor = "rgba(144, 196, 208, 0.3)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <GrCaretPrevious size={isDesktop ? 22 : 16} />
        </button>

        {/* Ground shadow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "4%",
            width: "72%",
            height: 28,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 75%)",
            filter: "blur(4px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="relative overflow-visible" style={{ zIndex: 10 }}>
          <HTMLFlipBook
            ref={flipBookRef}
            width={pageW}
            height={pageH}
            size="fixed"
            minWidth={pageW}
            maxWidth={pageW}
            minHeight={pageH}
            maxHeight={pageH}
            drawShadow
            showCover
            maxShadowOpacity={0.5}
            flippingTime={700}
            usePortrait
            startZIndex={0}
            autoSize={false}
            clickEventForward
            useMouseEvents
            swipeDistance={20}
            showPageCorners
            disableFlipByClick={false}
            onFlip={handleFlip}
            className="baltra-flipbook"
            style={{ touchAction: "pan-y" }}
          >
            {pages.map((src, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#fff",
                  overflow: "hidden",
                  position: "relative",
                }}
                aria-label={`Page ${i + 1} of ${totalPages}`}
              >
                <img
                  src={src}
                  alt={`Page ${i + 1}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    display: "block",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  loading={i > 3 ? "lazy" : "eager"}
                  draggable={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        <button
          onClick={handleNext}
          disabled={isAtEnd}
          aria-label="Next page"
          style={arrowBtnStyle("right", isAtEnd)}
          onMouseEnter={(e) => {
            if (isAtEnd) return;
            e.currentTarget.style.background = "rgba(74,122,138,0.4)";
            e.currentTarget.style.borderColor = "#90C4D0";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(7, 24, 36, 0.65)";
            e.currentTarget.style.borderColor = "rgba(144, 196, 208, 0.3)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <GrCaretNext size={isDesktop ? 22 : 16} />
        </button>
      </div>

      {/* HUD — page counter + progress bar */}
      <div
        className="w-full shrink-0 px-1"
        style={{ maxWidth: bookDisplayWidth || "100%" }}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-xs font-semibold tracking-widest uppercase font-gothamNarrow"
            style={{ color: "#6A90A0" }}
          >
            Page {currentPage + 1}
          </span>
          <span
            className="text-xs font-semibold tracking-widest uppercase font-gothamNarrow"
            style={{ color: "#6A90A0" }}
          >
            {totalPages} pages
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(26,48,64,0.8)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "linear-gradient(90deg, #4A7A8A, #90C4D0)",
              borderRadius: "2px",
              transition: "width 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyBook;
