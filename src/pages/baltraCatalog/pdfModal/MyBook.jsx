import { useCallback, useRef, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import HTMLFlipBook from "react-pageflip";
import flipSound from "../../../assets/videos/flipSound.mp3";

const images = import.meta.glob("../../../assets/book/*.png", { eager: true });

const imageArray = Object.entries(images)
  .sort(([a], [b]) => {
    const aIdx = parseInt(a.match(/(\d+)\.png$/)?.[1] ?? "0", 10);
    const bIdx = parseInt(b.match(/(\d+)\.png$/)?.[1] ?? "0", 10);
    return aIdx - bIdx;
  })
  .map(([, mod]) => mod.default);

const TOTAL_PAGES = imageArray.length;

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

const MyBook = () => {
  const flipBookRef = useRef(null);
  const audioRef = useRef(new Audio(flipSound));
  const [currentPage, setCurrentPage] = useState(0);

  const isAtEnd = currentPage >= TOTAL_PAGES - 1;
  const isAtStart = currentPage === 0;

  const playFlipSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const handleFlip = useCallback((e) => {
    const page = e.data;
    setCurrentPage(page);
  }, []);

  const handleNextPage = useCallback(() => {
    if (!flipBookRef.current || isAtEnd) return;
    flipBookRef.current.pageFlip().flipNext();
    // Sound disabled at last page — only play if NOT going to the last page
    if (currentPage < TOTAL_PAGES - 2) {
      playFlipSound();
    }
  }, [isAtEnd, currentPage, playFlipSound]);

  const handlePreviousPage = useCallback(() => {
    if (!flipBookRef.current || isAtStart) return;
    flipBookRef.current.pageFlip().flipPrev();
    playFlipSound();
  }, [isAtStart, playFlipSound]);

  const progressPercent =
    TOTAL_PAGES > 1 ? Math.round((currentPage / (TOTAL_PAGES - 1)) * 100) : 0;

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
            {imageArray.map((src, index) => (
              <div
                key={index}
                className="w-full h-full bg-white"
                aria-label={`Page ${index + 1} of ${TOTAL_PAGES}`}
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
            {TOTAL_PAGES} pages
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
