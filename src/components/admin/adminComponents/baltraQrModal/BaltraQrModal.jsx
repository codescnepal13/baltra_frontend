import React from "react";

const BaltraQrModal = ({ onClose, qrCodeSrc }) => {
  const downloadQrCode = async () => {
    try {
      const response = await fetch(qrCodeSrc);
      const blob = await response.blob();

      // Create an image element and load the blob as its source
      const img = new Image();
      img.src = window.URL.createObjectURL(blob);

      img.onload = () => {
        // Create a canvas element to draw the image
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set the canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        context.drawImage(img, 0, 0);

        // Convert the canvas content to a JPG blob
        canvas.toBlob((jpgBlob) => {
          const url = window.URL.createObjectURL(jpgBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "QRCode.jpg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, "image/jpeg");
      };

      img.onerror = (error) => {
        console.error("Failed to load image:", error);
      };
    } catch (error) {
      console.error("Failed to download QR code:", error);
    }
  };
  // const downloadQrCode = async () => {
  //   try {
  //     const response = await fetch(qrCodeSrc);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "QRCode.png";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Failed to download QR code:", error);
  //   }
  // };

  return (
    <div className="fixed font-gothamNarrow inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 font-gothamNarrow">
            QR Code
          </h3>
          <div className="mt-2 px-7">
            <img src={qrCodeSrc} alt="QR Code" className="max-w-full h-auto" />
          </div>
          <div className="items-center px-4 space-y-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 font-gothamNarrow"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 font-gothamNarrow"
              onClick={downloadQrCode}
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaltraQrModal;
