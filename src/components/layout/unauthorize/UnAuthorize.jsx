import { useState } from "react";
import {
  HiArrowLeft,
  HiArrowPath,
  HiFlag,
  HiHandThumbDown,
  HiHandThumbUp,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const UnAuthorize = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [voted, setVoted] = useState(null);
  const [reported, setReported] = useState(false);

  const handleLike = () => {
    if (voted === "like") return;
    if (voted === "dislike") setDislikes((d) => d - 1);
    setLikes((l) => l + 1);
    setVoted("like");
  };

  const handleDislike = () => {
    if (voted === "dislike") return;
    if (voted === "like") setLikes((l) => l - 1);
    setDislikes((d) => d + 1);
    setVoted("dislike");
  };

  const handleReport = () => {
    if (reported) return;
    setReported(true);
  };

  return (
    <div className="font-gothamNarrow min-h-screen bg-[#f8f6f3] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#e8e3dc] p-10 max-w-[480px] w-full text-center relative overflow-hidden">
        {/* Amber top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-t-3xl" />

        {/* Error badge */}
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Unauthorized
        </div>

        {/* 401 */}
        <div className="text-[88px] font-bold leading-none tracking-tighter text-slate-900 mb-0">
          4<span className="text-amber-500">0</span>1
        </div>

        {/* SVG illustration */}
        <svg
          viewBox="0 0 180 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-44 h-auto mx-auto my-4"
          aria-hidden="true"
        >
          {/* Card/document background */}
          <rect
            x="30"
            y="20"
            width="120"
            height="85"
            rx="10"
            fill="#fef9eb"
            stroke="#f9d98a"
            strokeWidth="1.5"
          />
          {/* Card header */}
          <rect x="30" y="20" width="120" height="22" rx="10" fill="#fde68a" />
          <rect x="30" y="30" width="120" height="12" fill="#fde68a" />

          {/* Lock body */}
          <rect
            x="76"
            y="65"
            width="28"
            height="22"
            rx="4"
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="1"
          />
          {/* Lock shackle */}
          <path
            d="M82 65 V57 Q90 48 98 57 V65"
            stroke="#d97706"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Keyhole circle */}
          <circle cx="90" cy="74" r="4" fill="#fff" opacity="0.7" />
          {/* Keyhole slot */}
          <rect
            x="88.5"
            y="75"
            width="3"
            height="5"
            rx="1"
            fill="#fff"
            opacity="0.7"
          />

          {/* Decorative lines (redacted content) */}
          <rect x="44" y="50" width="50" height="5" rx="2.5" fill="#f9d98a" />
          <rect x="44" y="58" width="35" height="5" rx="2.5" fill="#f9d98a" />

          {/* X marks on sides */}
          <line
            x1="22"
            y1="38"
            x2="27"
            y2="43"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="27"
            y1="38"
            x2="22"
            y2="43"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="153"
            y1="38"
            x2="158"
            y2="43"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="158"
            y1="38"
            x2="153"
            y2="43"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-2">
          Access denied
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-xs mx-auto">
          You don't have permission to view this page. Please contact your
          administrator or log in with an authorized account.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-7">
          <Link
            to="/baltra-aboutUs-Page"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            <HiArrowLeft size={15} />
            Back to home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-[#e0dbd4] hover:border-slate-300 hover:bg-[#f8f6f3] text-slate-500 hover:text-slate-800 text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
          >
            <HiArrowPath size={15} />
            Go back
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-[#f0ebe4] mb-5" />

        {/* Feedback row */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 mr-1">Was this helpful?</span>

          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
              voted === "like"
                ? "bg-green-50 border-green-200 text-green-700"
                : "border-[#e0dbd4] text-slate-500 hover:bg-[#f8f6f3] hover:text-slate-800"
            }`}
          >
            <HiHandThumbUp size={13} />
            <span className="min-w-[14px] text-center font-semibold">
              {likes}
            </span>
          </button>

          <button
            onClick={handleDislike}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
              voted === "dislike"
                ? "bg-red-50 border-red-200 text-red-600"
                : "border-[#e0dbd4] text-slate-500 hover:bg-[#f8f6f3] hover:text-slate-800"
            }`}
          >
            <HiHandThumbDown size={13} />
            <span className="min-w-[14px] text-center font-semibold">
              {dislikes}
            </span>
          </button>

          <button
            onClick={handleReport}
            disabled={reported}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              reported
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "border-[#e0dbd4] text-slate-500 hover:bg-[#f8f6f3] hover:text-slate-800"
            }`}
          >
            <HiFlag size={13} />
            {reported ? "Reported" : "Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorize;
