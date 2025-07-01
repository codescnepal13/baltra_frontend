import React from "react";

const InfoLayoutModal = ({ setConfirmed }) => {
  const handleOptionClick = (option) => {
    if (option === "app") {
      window.open("https://play.google.com/store", "_blank");
    } else if (option === "web") {
      const userLocation = window.location.href;
    }

    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white/70 backdrop-blur-lg rounded-lg p-8 shadow-2xl transform transition-transform max-w-md mx-auto hover:scale-105">
        <div className="text-center mb-6">
          <h2
            className="text-2xl font-bold text-gray-800 mb-3 font-gothamNarrow"
            style={{
              textShadow:
                "2px 2px 4px rgba(0, 0, 0, 0.3), 4px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Explore Baltra Website
          </h2>

          <p className="text-gray-600 text-sm font-gothamNarrow">
            Choose your preferred way to experience the website.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all font-gothamNarrow flex-1 md:mr-2 whitespace-nowrap cursor-pointer"
            onClick={() => handleOptionClick("app")}
          >
            Launch in App
          </button>
          <button
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all font-gothamNarrow flex-1 md:ml-2 whitespace-nowrap cursor-pointer"
            onClick={() => handleOptionClick("web")}
          >
            Open in Web Browser
          </button>
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm font-gothamNarrow">
          Tip: The app offers an enhanced experience!
        </div>
      </div>
    </div>
  );
};

export default InfoLayoutModal;
