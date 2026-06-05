import { useState } from "react";

const BaltraQrModal = ({ onClose, qrCodeSrc }) => {
  const [downloaded, setDownloaded] = useState(false);

  const downloadQrCode = async () => {
    try {
      const response = await fetch(qrCodeSrc);
      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);

        canvas.toBlob((jpgBlob) => {
          const url = URL.createObjectURL(jpgBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "QRCode.jpg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          setDownloaded(true);
          setTimeout(() => setDownloaded(false), 2000);
        }, "image/jpeg");
      };
    } catch (error) {
      console.error("Failed to download QR code:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 shrink-0">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 font-gothamNarrow">
              QR Code
            </p>
            <p className="text-xs text-gray-400 font-gothamNarrow">
              Ready to scan or download
            </p>
          </div>
        </div>

        {/* QR Image */}
        <div className="flex flex-col items-center gap-3 px-6 pt-6 pb-2">
          <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
            <img
              src={qrCodeSrc}
              alt="QR Code"
              className="w-44 h-44 object-contain"
            />
          </div>
          <p className="text-xs text-gray-400 font-gothamNarrow">
            Scan with your camera app
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 px-6 py-5">
          <button
            onClick={downloadQrCode}
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium font-gothamNarrow border transition-all duration-150
              ${
                downloaded
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 active:scale-[0.98]"
              }`}
          >
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
                d={
                  downloaded
                    ? "M5 13l4 4L19 7"
                    : "M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m-4-4l4 4 4-4"
                }
              />
            </svg>
            {downloaded ? "Downloaded!" : "Download QR Code"}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm text-gray-400 font-gothamNarrow bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaltraQrModal;
