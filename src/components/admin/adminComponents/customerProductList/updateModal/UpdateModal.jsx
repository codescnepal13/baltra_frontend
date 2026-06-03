import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCustomerError,
  verifiedCustomerProduct,
} from "../../../../../redux/features/customer/customerSlice";

const STATUS_OPTIONS = [
  { value: "", label: "Select Status" },
  { value: "Verified", label: "Verified" },
  { value: "Not Verified", label: "Not Verified" },
];

// Maps UI value → API payload value
const STATUS_MAP = {
  Verified: "Approved",
  "Not Verified": "Not Verified",
};

const UpdateModal = ({ item, onClose, verificationSuccess }) => {
  const { isLoading, error } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(item.status || "");

  const handleUpdate = async (id) => {
    if (!status || !STATUS_MAP[status]) return;
    const data = { stock_id: id, status: STATUS_MAP[status] };
    await dispatch(verifiedCustomerProduct({ data, enqueueSnackbar }));
    if (verificationSuccess) onClose();
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearCustomerError());
    }
  }, [error, dispatch]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center font-gothamNarrow"
      style={{
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0,0,0,0.55)",
      }}
    >
      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* ── Top red accent bar ── */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-pink-500" />

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <HiOutlineCheckCircle size={18} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
                Update Status
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Customer #{item.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gray-100 mx-6" />

        {/* ── Body ── */}
        <div className="px-6 py-5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Verification Status
          </label>

          {/* Select */}
          <div className="relative">
            <select
              className="appearance-none w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-semibold text-gray-700 focus:outline-none focus:border-red-500 focus:bg-white transition-colors cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <HiOutlineChevronDown
              size={16}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Live preview pill */}
          {status && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] text-gray-400">Selected:</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ${
                  status === "Verified"
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-red-50 text-red-600 ring-red-200"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status === "Verified" ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                {status}
                {status === "Verified" && (
                  <span className="text-[10px] text-emerald-500 font-normal ml-0.5">
                    → Approved
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleUpdate(item.id)}
            disabled={isLoading || !status}
            className="flex-1 relative py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-sm font-bold text-white shadow-md shadow-red-200 hover:shadow-red-300 hover:from-red-700 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Updating…
              </span>
            ) : (
              "Update Status"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UpdateModal);
