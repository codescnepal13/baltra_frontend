import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminError,
  verifiedBulkQuoteProduct,
} from "../../../../../redux/features/admin/adminSlice";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const BulkStatusModal = ({ item, onClose }) => {
  const { isProcessing, error } = useSelector((state) => state.admin);
  const {
    quote_id,
    customer_name,
    model_num,
    quantity,
    status: currentStatus,
  } = item || {};
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  const handleUpdate = async () => {
    if (!selected) {
      enqueueSnackbar("Please select an action", { variant: "error" });
      return;
    }
    await dispatch(
      verifiedBulkQuoteProduct({
        quote_id,
        data: { action: selected },
        enqueueSnackbar,
      }),
    );
    onClose();
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearAdminError());
    }
  }, [dispatch, error]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-[17px] font-medium text-gray-900">
              Update quote status
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
            aria-label="Close"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {/* Info strip */}
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 mb-4">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C0392B"
              strokeWidth="2"
              className="flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[12px] text-red-800 leading-relaxed">
              This action will notify the customer. Choose carefully before
              confirming.
            </p>
          </div>

          {/* Customer context */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-9 h-9 rounded-full bg-[#FAEEDA] text-[#854F0B] text-xs font-medium flex items-center justify-center flex-shrink-0">
              {getInitials(customer_name)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {customer_name}
              </p>
              <p className="text-[11px] text-gray-400 font-mono">
                Quote #{model_num} · {Number(quantity).toLocaleString()} units
              </p>
            </div>
          </div>

          {/* Action cards */}
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2.5">
            Select action
          </p>
          <div className="grid grid-cols-2 gap-2">
            {/* Approve */}
            <button
              type="button"
              onClick={() => setSelected("approve")}
              className={`text-left border rounded-xl p-3 transition-all ${
                selected === "approve"
                  ? "border-[#3B6D11] bg-[#EAF3DE]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${
                  selected === "approve" ? "bg-[#C0DD97]" : "bg-[#EAF3DE]"
                }`}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3B6D11"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                className={`text-sm font-medium ${selected === "approve" ? "text-[#3B6D11]" : "text-gray-800"}`}
              >
                Approve
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Confirm and proceed
              </p>
            </button>

            {/* Reject */}
            <button
              type="button"
              onClick={() => setSelected("reject")}
              className={`text-left border rounded-xl p-3 transition-all ${
                selected === "reject"
                  ? "border-[#A32D2D] bg-[#FCEBEB]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${
                  selected === "reject" ? "bg-[#F7C1C1]" : "bg-[#FCEBEB]"
                }`}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A32D2D"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p
                className={`text-sm font-medium ${selected === "reject" ? "text-[#A32D2D]" : "text-gray-800"}`}
              >
                Reject
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Decline this quote
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isProcessing || !selected}
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing && (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {isProcessing ? "Updating…" : "Confirm update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkStatusModal;
