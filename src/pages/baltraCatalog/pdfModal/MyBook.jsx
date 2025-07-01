import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import flipSound from "../../../assets/videos/flipSound.mp3";

// To dynamically import all images from the assets folder
const images = import.meta.glob("../../../assets/book/*.png", { eager: true });

// Convert the imported modules into an array of image URLs
const imageArray = Object.entries(images)
  .sort((a, b) => {
    const aIndex = parseInt(a[0].match(/(\d+)\.png$/)[1], 10);
    const bIndex = parseInt(b[0].match(/(\d+)\.png$/)[1], 10);
    return aIndex - bIndex;
  })
  .map((module) => module[1].default);

const flipSettings = {
  width: 300,
  height: 400,
  size: "fixed",
  drawShadow: true,
  showCover: true,
  maxShadowOpacity: 0.5,
  flippingTime: 1000,
};

const MyBook = () => {
  const flipBookRef = useRef(null);
  const audioRef = useRef(new Audio(flipSound)); // Reference to the sound file

  // Function to play the sound
  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset the sound to start
      audioRef.current.play(); // Play the sound
    }
  };

  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
      playFlipSound(); // Play sound when flipping to next page
    }
  };

  const handlePreviousPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
      playFlipSound(); // Play sound when flipping to previous page
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <button
        onClick={handlePreviousPage}
        className="text-white p-3 hidden rounded-full hover:bg-red-700 m-4 md:flex"
      >
        <GrCaretPrevious />
      </button>
      <HTMLFlipBook ref={flipBookRef} {...flipSettings}>
        {imageArray.map((image, index) => (
          <div key={index} className="w-full h-full">
            <img
              src={image}
              alt={`Page ${index + 1}`}
              className="object-cover w-full h-full bg-white"
            />
          </div>
        ))}
      </HTMLFlipBook>
      <button
        onClick={handleNextPage}
        className="text-white p-3 rounded-full hover:bg-red-700 m-4 hidden md:flex"
      >
        <GrCaretNext />
      </button>
    </div>
  );
};

export default MyBook;
