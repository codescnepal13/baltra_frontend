import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminError,
  verifiedCustomizedProduct,
} from "../../../../redux/features/admin/adminSlice";

const UpdateCustomizedModal = ({ item, onClose }) => {
  const { isLoading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(item.status || "");

  const handleUpdate = async (id) => {
    await dispatch(
      verifiedCustomizedProduct({
        data: { personalization_id: id, status: "Approved" },
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 font-gothamNarrow p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 font-gothamNarrow leading-tight">
                Update status
              </p>
              <p className="text-[11px] text-gray-400 font-gothamNarrow">
                Customized product verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          {/* Item info chip */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-100 px-4 py-3">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 font-gothamNarrow uppercase tracking-wider">
                Item ID
              </p>
              <p className="text-sm font-semibold text-gray-800 font-gothamNarrow truncate">
                #{item.id}
              </p>
            </div>
            <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium font-gothamNarrow shrink-0">
              {item.status || "Pending"}
            </span>
          </div>

          {/* Select */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 font-gothamNarrow uppercase tracking-wider">
              Verify status
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full text-sm font-gothamNarrow bg-white text-gray-800 border border-gray-200 rounded-xl py-2.5 pl-4 pr-9 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Choose status</option>
                <option value="Verified">Approved ✓</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Info hint */}
          <div className="flex gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <svg
              className="w-4 h-4 text-green-600 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs text-green-700 font-gothamNarrow leading-relaxed">
              Approving will notify the customer and mark this product as
              verified in the system.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm text-gray-500 font-gothamNarrow bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleUpdate(item.id)}
              disabled={isLoading || !status}
              className="flex-[2] py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium font-gothamNarrow rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              )}
              {isLoading ? "Updating..." : "Approve & update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UpdateCustomizedModal);
