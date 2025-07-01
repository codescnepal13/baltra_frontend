import { memo, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const DeletePersonalizationModal = ({ onClose, onConfirm }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-auto bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md mx-auto rounded shadow-md relative">
          {/* Add close icon */}
          <IoCloseSharp
            className="absolute top-2 right-2 cursor-pointer"
            size={24}
            onClick={onClose}
          />

          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 py-2 font-gothamNarrow">
              Delete Item
            </h2>
            <h3 className="text-gray-500 tex-sm font-gothamNarrow">
              Are you sure you want to delete this Item?
            </h3>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 font-gothamNarrow"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-gothamNarrow"
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

export default memo(DeletePersonalizationModal);
