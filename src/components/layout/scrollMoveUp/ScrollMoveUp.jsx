import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollMoveUp = () => {
  const [isVisible, setVisible] = useState(false);

  const gotToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const winScroll = document.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHidden) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      <section className="mySection flex justify-center items-center">
        {isVisible && (
          <div
            onClick={gotToBtn}
            className="lg:flex hidden justify-center items-center text-white bg-red-600 rounded-full w-10 h-10 fixed bottom-10 right-5 z-50 cursor-pointer"
          >
            <FaArrowUp className="text-white text-lg" />
          </div>
        )}
      </section>
    </>
  );
};

export default ScrollMoveUp;
