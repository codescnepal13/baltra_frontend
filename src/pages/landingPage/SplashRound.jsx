import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashRound = ({ onAnimationEnd }) => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);

    const timer = setTimeout(() => {
      setAnimate(false);
      onAnimationEnd();
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, onAnimationEnd]);

  useEffect(() => {
    if (!animate) {
      navigate("/baltra-aboutUs-Page");
    }
  }, [animate, navigate]);

  return (
    <div
      className={`bg-black rounded-full fixed top-0 left-0 w-screen h-screen flex items-center justify-center transition-all duration-1000 ease-out transform ${
        animate ? "scale-150" : "scale-0"
      }`}
    ></div>
  );
};

export default SplashRound;
