import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const LogoutPopUp = ({ onClose, handleLogout }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    handleLogout();
  };
  return (
    <>
      <div className="absolute -top-3/4 inset-0 z-50 overflow-auto bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-10 max-w-md mx-auto rounded shadow-md relative">
          {/* Add close icon */}
          <IoCloseSharp
            className="absolute top-2 right-2 cursor-pointer"
            size={24}
            onClick={onClose}
          />

          <div className="text-center mb-4">
            <p className="text-[#000000] text-lg font-semibold font-gothamNarrow">
              Are you sure want to Logout?
            </p>
          </div>
          <div className="flex justify-center pt-2">
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
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutPopUp;
