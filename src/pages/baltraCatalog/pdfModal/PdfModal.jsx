import React from "react";
import MyBook from "./MyBook";

const PdfModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 m-2">
      <div className="relative max-w-[800px] w-full h-[600px] lg:h-[500px] rounded-2xl bg-red-600">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-100 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <div className="flex justify-center items-center">
          <h1 className="text-lg text-white text-center mt-12 md:mt-4 m-2">
            Drag or tap on the page to navigate
          </h1>
        </div>
        <MyBook />
      </div>
    </div>
  );
};

export default PdfModal;
