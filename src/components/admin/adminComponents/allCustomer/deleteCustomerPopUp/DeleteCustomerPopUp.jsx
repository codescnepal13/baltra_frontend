import { memo, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const DeleteCustomerPopUp = ({ onClose, onConfirm }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-auto bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white p-10 w-full max-w-lg mx-auto rounded-xl shadow-2xl relative border border-gray-100">
          {/* Add close icon */}
          <IoCloseSharp
            className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            size={28}
            onClick={onClose}
          />

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 py-3 font-gothamNarrow">
              Delete Item
            </h2>
            <h3 className="text-gray-600 text-lg font-gothamNarrow leading-relaxed">
              Are you sure you want to delete this Item?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 font-gothamNarrow text-lg transition-colors min-w-28"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 font-gothamNarrow text-lg transition-colors min-w-28"
              onClick={handleConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DeleteCustomerPopUp);
