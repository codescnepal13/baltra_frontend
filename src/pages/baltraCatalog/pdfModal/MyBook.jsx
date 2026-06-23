import * as pdfjsLib from "pdfjs-dist";
import { useCallback, useEffect, useRef, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import HTMLFlipBook from "react-pageflip";
import flipSound from "../../../assets/videos/flipSound.mp3";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// ─── Render one PDF page → PNG data-URL, scaled for retina sharpness ─────────
async function renderPageToDataUrl(pdfDoc, pageNum) {
  const page = await pdfDoc.getPage(pageNum);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const scale = Math.min(3, Math.max(2.2, dpr * 1.75));
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext("2d"), viewport })
    .promise;
  return {
    dataUrl: canvas.toDataURL("image/png"),
    aspectRatio: viewport.width / viewport.height, // w ÷ h
  };
}

// ─── Layout constants ─────────────────────────────────────────────────────────
// Arrows now float OVER the page edges (absolute, no layout width reserved).
// The bottom strip is just a one-line page counter + hairline bar, so this
// is the only vertical space we give up — everything else goes to the page.
const RESERVE_H = 34;

const isDesktopViewport = () => window.matchMedia("(min-width: 768px)").matches;

// ─── Fit-to-box book sizing ───────────────────────────────────────────────────
// Measures the real available box (the modal's body element) and fits the
// book to whichever axis — width or height — actually binds, using nearly
// 100% of both since arrows/HUD no longer take dedicated layout space.
function calcBookSize(containerEl, aspectRatio) {
  if (!containerEl) return { pageW: 280, pageH: 373 };

  const box = containerEl.parentElement || containerEl;
  const isMd = isDesktopViewport();

  const availW = box.clientWidth || 320;
  const availH = box.clientHeight || 480;
  const bookAvailH = Math.max(140, availH - RESERVE_H);

  if (isMd) {
    // Two-page spread — full available width, split in half.
    const hIfWidthBound = availW / 2 / aspectRatio;
    let pageW, pageH;
    if (hIfWidthBound <= bookAvailH) {
      pageW = Math.floor(availW / 2);
      pageH = Math.floor(hIfWidthBound);
    } else {
      pageH = Math.floor(bookAvailH);
      pageW = Math.floor(pageH * aspectRatio);
    }
    return { pageW, pageH };
  }

  // Mobile: single page, full available width.
  const hIfWidthBound = availW / aspectRatio;
  let pageW, pageH;
  if (hIfWidthBound <= bookAvailH) {
    pageW = Math.floor(availW);
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

  // ── Keep the book fit to its box live ──────────────────────────────────────
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

  // Floating overlay arrow — sits over the edge of the stage, not in the
  // flex flow, so it never costs the page image any width or height.
  const arrowBtnStyle = (side, disabled) => ({
    position: "absolute",
    [side]: isDesktop ? 8 : 4,
    top: "50%",
    transform: "translateY(-50%)",
    width: isDesktop ? 42 : 34,
    height: isDesktop ? 42 : 34,
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(7, 24, 36, 0.6)",
    border: "1px solid rgba(144, 196, 208, 0.3)",
    backdropFilter: "blur(4px)",
    color: disabled ? "#3A5060" : "#90C4D0",
    opacity: disabled ? 0.35 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    zIndex: 20,
    transition: "background-color 0.2s, border-color 0.2s, transform 0.15s",
  });

  // ── Error ──────────────────────────────────────────────────────────────────
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center">
        <span className="text-3xl opacity-30">⚠️</span>
        <p className="text-sm font-medium" style={{ color: "#90C4D0" }}>
          {loadError}
        </p>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  const r = 26;
  const circ = 2 * Math.PI * r;

  if (pages.length === 0) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col items-center justify-center gap-4 py-16"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle
            cx="32"
            cy="32"
            r={r}
            stroke="rgba(74,122,138,0.15)"
            strokeWidth="4"
          />
          <circle
            cx="32"
            cy="32"
            r={r}
            stroke="#4A7A8A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(loadProgress / 100) * circ} ${circ}`}
            transform="rotate(-90 32 32)"
            style={{ transition: "stroke-dasharray 0.35s ease" }}
          />
        </svg>
        <p
          className="text-xs font-medium tracking-widest uppercase font-gothamNarrow"
          style={{ color: "#6A90A0" }}
        >
          {loadProgress < 100
            ? `Rendering pages… ${loadProgress}%`
            : "Preparing flipbook…"}
        </p>
      </div>
    );
  }

  const { pageW, pageH } = bookSize ?? { pageW: 280, pageH: 373 };
  const bookDisplayWidth = isDesktop ? pageW * 2 : pageW;

  // ── Flipbook ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center gap-1.5"
    >
      {/* Book stage — fills essentially the whole box; arrows float on top */}
      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
        <button
          onClick={handlePrev}
          disabled={isAtStart}
          aria-label="Previous page"
          style={arrowBtnStyle("left", isAtStart)}
          onMouseEnter={(e) => {
            if (isAtStart) return;
            e.currentTarget.style.background = "rgba(74,122,138,0.35)";
            e.currentTarget.style.borderColor = "#90C4D0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(7, 24, 36, 0.6)";
            e.currentTarget.style.borderColor = "rgba(144, 196, 208, 0.3)";
          }}
        >
          <GrCaretPrevious size={isDesktop ? 17 : 14} />
        </button>

        {/* Ground shadow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "6%",
            width: "78%",
            height: 22,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 75%)",
            filter: "blur(3px)",
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
            maxShadowOpacity={0.45}
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
            e.currentTarget.style.background = "rgba(74,122,138,0.35)";
            e.currentTarget.style.borderColor = "#90C4D0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(7, 24, 36, 0.6)";
            e.currentTarget.style.borderColor = "rgba(144, 196, 208, 0.3)";
          }}
        >
          <GrCaretNext size={isDesktop ? 17 : 14} />
        </button>
      </div>

      {/* Slim HUD — one line, page counter + hairline progress only */}
      <div
        className="w-full shrink-0"
        style={{ maxWidth: bookDisplayWidth || "100%" }}
      >
        <div className="flex justify-between items-center mb-1">
          <span
            className="text-[11px] font-medium tracking-widest uppercase font-gothamNarrow"
            style={{ color: "#6A90A0" }}
          >
            Page {currentPage + 1}
          </span>
          <span
            className="text-[11px] font-medium tracking-widest uppercase font-gothamNarrow"
            style={{ color: "#6A90A0" }}
          >
            {totalPages} pages
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
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
