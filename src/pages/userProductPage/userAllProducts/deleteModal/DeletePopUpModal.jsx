import { useEffect, useState } from "react";
import {
  IoCloseSharp,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";

const DeletePopUpModal = ({ onClose, handleDelete }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      handleDelete();
    }, 500);
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isVisible && !isClosing
            ? "bg-black/60 backdrop-blur-md"
            : "bg-black/0 backdrop-blur-none"
        }`}
        onClick={handleClose}
      >
        {/* Modal Container */}
        <div
          className={`relative transform transition-all duration-300 ease-out ${
            isVisible && !isClosing
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Modal */}
          <div
            className="bg-gradient-to-br from-white via-gray-50 to-gray-100 
                         rounded-3xl shadow-2xl border border-gray-200/50 
                         p-8 max-w-lg mx-4 relative overflow-hidden
                         backdrop-blur-xl bg-opacity-95"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full 
                       bg-gray-100 hover:bg-gray-200 
                       transition-all duration-200 hover:scale-110
                       group shadow-md"
              onClick={handleClose}
            >
              <IoCloseSharp className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </button>

            {/* Icon Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {/* Animated background circle */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 
                              rounded-full animate-pulse opacity-20 scale-110"
                ></div>

                {/* Icon container */}
                <div
                  className="relative bg-gradient-to-br from-red-500 to-red-600 
                              rounded-full p-4 shadow-lg"
                >
                  {confirmed ? (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <div
                        className="w-6 h-6 border-3 border-white border-t-transparent 
                                    rounded-full animate-spin"
                      ></div>
                    </div>
                  ) : (
                    <IoTrashOutline className="w-12 h-12 text-white" />
                  )}
                </div>

                {/* Warning indicator */}
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1 shadow-lg">
                  <IoWarningOutline className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="text-center mb-8 space-y-3">
              <h2
                className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 
                           bg-clip-text text-transparent"
              >
                {confirmed ? "Deleting..." : "Delete Item?"}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                {confirmed
                  ? "Please wait while we process your request..."
                  : "This action cannot be undone. The item will be permanently removed from your account."}
              </p>
            </div>

            {/* Action Buttons */}
            {!confirmed && (
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-gray-100 hover:bg-gray-200 
                           text-gray-700 font-semibold py-4 px-6 rounded-2xl 
                           transition-all duration-200 hover:scale-105 hover:shadow-md
                           border border-gray-200"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 
                           hover:from-red-600 hover:to-red-700
                           text-white font-semibold py-4 px-6 rounded-2xl 
                           transition-all duration-200 hover:scale-105 hover:shadow-lg
                           shadow-red-500/25 hover:shadow-red-500/40"
                  onClick={handleConfirm}
                >
                  Delete Forever
                </button>
              </div>
            )}

            {/* Progress indicator for confirmed state */}
            {confirmed && (
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 
                                rounded-full animate-pulse"
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Glow effect */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 
                         rounded-3xl blur-xl scale-110 opacity-50"
          ></div>
        </div>
      </div>
    </>
  );
};

export default DeletePopUpModal;
