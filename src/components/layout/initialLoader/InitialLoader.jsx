import React, { useEffect, useState } from "react";
import InitialLogo from "../../../assets/images/InitialLogoImg.png";

const InitialLoader = ({ isLoading }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
    }
  }, [isLoading]);

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-white transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* 3D Spinning Border */}
        <div className="absolute rounded-full h-36 w-36 md:h-44 md:w-44 border-t-4 border-b-4 border-gray-300 animate-3d-spin"></div>

        {/* Enlarged Logo with 3D Animation */}
        <img
          src={InitialLogo}
          alt="Baltra Logo"
          className="relative w-28 h-auto max-w-full md:w-36 lg:w-44 object-contain animate-logo-scale"
        />
      </div>
    </div>
  );
};

export default InitialLoader;
