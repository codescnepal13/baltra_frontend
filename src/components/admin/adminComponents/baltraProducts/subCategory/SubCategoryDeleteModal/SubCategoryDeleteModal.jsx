import { memo, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const SubCategoryDeleteModal = ({ onClose, onConfirm }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-sm mx-4 rounded-2xl shadow-xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-400 to-red-600" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <FaTrashAlt className="text-red-500" size={13} />
            </div>
            <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-gray-800">
              Delete Item
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <IoCloseSharp size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-5" />

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-[13px] text-gray-500 tracking-[0.01em] leading-[1.6]">
            Are you sure you want to delete this item? This action{" "}
            <span className="font-medium text-gray-700">cannot be undone</span>{" "}
            and the data will be permanently removed.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12.5px] font-medium tracking-[0.02em] text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirmed}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[12.5px] font-medium tracking-[0.02em] text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <FaTrashAlt size={11} />
            {confirmed ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(SubCategoryDeleteModal);
