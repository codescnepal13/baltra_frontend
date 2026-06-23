import * as pdfjsLib from "pdfjs-dist";
import { useCallback, useEffect, useRef, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import HTMLFlipBook from "react-pageflip";
import flipSound from "../../../assets/videos/flipSound.mp3";

// Point the worker at the bundled worker file (Vite copies it to /public automatically
// when you add the alias below — see vite.config.js note at the bottom of this file)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// ─── Constants ───────────────────────────────────────────────────────────────

const FLIP_SETTINGS = {
  width: 300,
  height: 400,
  size: "fixed",
  drawShadow: true,
  showCover: true,
  maxShadowOpacity: 0.5,
  flippingTime: 900,
  usePortrait: true,
  startZIndex: 0,
  autoSize: false,
  clickEventForward: true,
  useMouseEvents: true,
  swipeDistance: 30,
  showPageCorners: true,
  disableFlipByClick: false,
};

// Render scale — higher = sharper pages but more memory.
// 1.5 is a good balance for a 300×400 flipbook at retina displays.
const RENDER_SCALE = 1.5;

// ─── PDF page renderer ────────────────────────────────────────────────────────

/**
 * Renders a single PDF page to a data-URL string.
 * @param {import("pdfjs-dist").PDFDocumentProxy} pdfDoc
 * @param {number} pageNum  1-based
 * @param {number} scale
 * @returns {Promise<string>} data URL (image/png)
 */
async function renderPageToDataUrl(pdfDoc, pageNum, scale) {
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;

  return canvas.toDataURL("image/png");
}

// ─── MyBook ───────────────────────────────────────────────────────────────────

/**
 * @param {{ pdfUrl: string }} props
 *   pdfUrl — direct URL to the PDF file
 *             (must allow CORS — configure Django or use a Vite proxy)
 */
const MyBook = ({ pdfUrl }) => {
  const flipBookRef = useRef(null);
  const audioRef = useRef(new Audio(flipSound));

  // Rendered page images (data URLs)
  const [pages, setPages] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0); // 0-100
  const [loadError, setLoadError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  // ── Load & render PDF ──
  useEffect(() => {
    if (!pdfUrl) return;

    let cancelled = false;

    const load = async () => {
      setPages([]);
      setLoadProgress(0);
      setLoadError(null);
      setCurrentPage(0);

      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          // withCredentials: false (default) — flip to true if Django uses
          // session cookies for auth AND you've set CORS_ALLOW_CREDENTIALS=True
        });

        const pdfDoc = await loadingTask.promise;
        if (cancelled) return;

        const totalPages = pdfDoc.numPages;
        const rendered = [];

        for (let i = 1; i <= totalPages; i++) {
          if (cancelled) return;
          const dataUrl = await renderPageToDataUrl(pdfDoc, i, RENDER_SCALE);
          rendered.push(dataUrl);
          setLoadProgress(Math.round((i / totalPages) * 100));
          // Yield after each page so the browser stays responsive
          await new Promise((r) => requestAnimationFrame(r));
        }

        if (!cancelled) setPages(rendered);
      } catch (err) {
        if (!cancelled) {
          console.error("[MyBook] PDF load error:", err);
          setLoadError(
            err?.message?.includes("fetch")
              ? "Could not fetch the PDF. Check that the server allows CORS (see README)."
              : `Failed to load PDF: ${err.message}`,
          );
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // ── Flipbook controls ──
  const totalPages = pages.length;
  const isAtEnd = currentPage >= totalPages - 1;
  const isAtStart = currentPage === 0;

  const playFlipSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const handleFlip = useCallback((e) => setCurrentPage(e.data), []);

  const handleNextPage = useCallback(() => {
    if (!flipBookRef.current || isAtEnd) return;
    flipBookRef.current.pageFlip().flipNext();
    if (currentPage < totalPages - 2) playFlipSound();
  }, [isAtEnd, currentPage, totalPages, playFlipSound]);

  const handlePreviousPage = useCallback(() => {
    if (!flipBookRef.current || isAtStart) return;
    flipBookRef.current.pageFlip().flipPrev();
    playFlipSound();
  }, [isAtStart, playFlipSound]);

  const progressPercent =
    totalPages > 1 ? Math.round((currentPage / (totalPages - 1)) * 100) : 0;

  // ── Loading state ──
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

  if (pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        {/* Animated progress ring */}
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="rgba(74,122,138,0.15)"
            strokeWidth="4"
          />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="#4A7A8A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(loadProgress / 100) * 163} 163`}
            transform="rotate(-90 32 32)"
            style={{ transition: "stroke-dasharray 0.3s ease" }}
          />
        </svg>
        <p
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "#6A90A0" }}
        >
          {loadProgress < 100
            ? `Rendering pages… ${loadProgress}%`
            : "Almost there…"}
        </p>
      </div>
    );
  }

  // ── Flipbook ──
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Flipbook + Nav Row */}
      <div className="flex justify-center items-center gap-2 md:gap-4">
        {/* Prev Button */}
        <button
          onClick={handlePreviousPage}
          disabled={isAtStart}
          aria-label="Previous page"
          className={`
            hidden md:flex items-center justify-center
            w-10 h-10 rounded-full border transition-all duration-200
            ${
              isAtStart
                ? "border-[#2A3F4B] text-[#3A5060] cursor-not-allowed opacity-40"
                : "border-[#4A7A8A] text-[#90C4D0] hover:bg-[#1A3040] hover:border-[#90C4D0] active:scale-95"
            }
          `}
        >
          <GrCaretPrevious size={16} />
        </button>

        {/* Book */}
        <div className="shadow-2xl shadow-black/60 rounded-sm overflow-hidden">
          <HTMLFlipBook
            ref={flipBookRef}
            {...FLIP_SETTINGS}
            onFlip={handleFlip}
            className="baltra-flipbook"
          >
            {pages.map((src, index) => (
              <div
                key={index}
                className="w-full h-full bg-white"
                aria-label={`Page ${index + 1} of ${totalPages}`}
              >
                <img
                  src={src}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index > 3 ? "lazy" : "eager"}
                  draggable={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={isAtEnd}
          aria-label="Next page"
          className={`
            hidden md:flex items-center justify-center
            w-10 h-10 rounded-full border transition-all duration-200
            ${
              isAtEnd
                ? "border-[#2A3F4B] text-[#3A5060] cursor-not-allowed opacity-40"
                : "border-[#4A7A8A] text-[#90C4D0] hover:bg-[#1A3040] hover:border-[#90C4D0] active:scale-95"
            }
          `}
        >
          <GrCaretNext size={16} />
        </button>
      </div>

      {/* Mobile Nav Buttons */}
      <div className="flex gap-6 md:hidden">
        <button
          onClick={handlePreviousPage}
          disabled={isAtStart}
          aria-label="Previous page"
          className={`
            flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
            ${
              isAtStart
                ? "border-[#2A3F4B] text-[#3A5060] opacity-40 cursor-not-allowed"
                : "border-[#4A7A8A] text-[#90C4D0] hover:bg-[#1A3040] active:scale-95"
            }
          `}
        >
          <GrCaretPrevious size={14} />
          <span>Prev</span>
        </button>
        <button
          onClick={handleNextPage}
          disabled={isAtEnd}
          aria-label="Next page"
          className={`
            flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
            ${
              isAtEnd
                ? "border-[#2A3F4B] text-[#3A5060] opacity-40 cursor-not-allowed"
                : "border-[#4A7A8A] text-[#90C4D0] hover:bg-[#1A3040] active:scale-95"
            }
          `}
        >
          <span>Next</span>
          <GrCaretNext size={14} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-[620px] px-2">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[#6A90A0] font-medium tracking-wider uppercase">
            Page {currentPage + 1}
          </span>
          <span className="text-xs text-[#6A90A0] font-medium tracking-wider uppercase">
            {totalPages} pages
          </span>
        </div>
        <div className="w-full h-0.5 bg-[#1A3040] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4A7A8A] to-[#90C4D0] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyBook;

/*
 * ─── SETUP NOTES ─────────────────────────────────────────────────────────────
 *
 * 1. WORKER — add this to vite.config.js so the worker file is bundled correctly:
 *
 *    import { viteStaticCopy } from "vite-plugin-static-copy";   // npm i -D vite-plugin-static-copy
 *
 *    plugins: [
 *      ...,
 *      viteStaticCopy({
 *        targets: [
 *          {
 *            src: "node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
 *            dest: "",   // copies to dist/ root
 *          },
 *        ],
 *      }),
 *    ],
 *
 *    OR — simpler approach using new URL() (already in this file):
 *    Vite automatically resolves `new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url)`
 *    and emits the worker as a separate chunk. No plugin needed with Vite ≥ 3.
 *
 * 2. CORS — the PDF lives at http://192.168.1.123:8000/media/...
 *    pdfjs-dist fetches it with a regular XHR/fetch, so Django must return:
 *
 *      Access-Control-Allow-Origin: http://localhost:5173   (or * for dev)
 *
 *    Install django-cors-headers and in settings.py:
 *
 *      INSTALLED_APPS += ["corsheaders"]
 *      MIDDLEWARE = ["corsheaders.middleware.CorsMiddleware", ...rest...]
 *      CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
 *      # or for dev only:
 *      CORS_ALLOW_ALL_ORIGINS = True
 *
 *    Alternatively proxy via Vite (no Django changes needed in dev):
 *
 *      // vite.config.js
 *      server: {
 *        proxy: {
 *          "/media": {
 *            target: "http://192.168.1.123:8000",
 *            changeOrigin: true,
 *          },
 *        },
 *      },
 *
 *    Then pass the proxied URL to MyBook:
 *      pdfUrl={catalog.file.replace("http://192.168.1.123:8000", "")}
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */
