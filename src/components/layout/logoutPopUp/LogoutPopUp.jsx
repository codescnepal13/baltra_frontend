import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

const LogoutPopUp = ({ onClose, handleLogout }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await handleLogout();
    setLoading(false);
  };

  return (
    /* ── Backdrop ─────────────────────────────────────────────────────── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      {/* ── Modal card ── */}
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="
            absolute top-3.5 right-3.5 w-7 h-7 rounded-lg
            flex items-center justify-center
            border border-slate-200 bg-slate-50
            text-slate-400 hover:text-slate-600 hover:bg-slate-100
            transition-colors duration-100
          "
        >
          <IoCloseSharp size={15} />
        </button>

        {/* Body */}
        <div className="flex flex-col items-center gap-2 px-8 pt-8 pb-6 text-center">
          {/* Icon ring */}
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-1 flex-shrink-0">
            <FiLogOut size={24} className="text-red-500" aria-hidden="true" />
          </div>

          <h2
            id="logout-title"
            className="text-[15px] font-semibold text-gray-900 leading-snug"
          >
            Log out of your account?
          </h2>
          <p className="text-[13px] text-gray-400 leading-relaxed max-w-[240px]">
            You'll need to sign in again to access the dashboard.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-2.5 px-6 pb-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex-1 h-10 rounded-xl border border-slate-200
              text-[13px] font-medium text-slate-600
              bg-slate-50 hover:bg-slate-100 hover:border-slate-300
              transition-colors duration-100
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="
              flex-1 h-10 rounded-xl
              inline-flex items-center justify-center gap-2
              text-[13px] font-semibold text-white
              bg-red-500 hover:bg-red-600 active:bg-red-700
              transition-colors duration-100
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Logging out…
              </>
            ) : (
              <>
                <FiLogOut size={14} aria-hidden="true" />
                Log out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopUp;
