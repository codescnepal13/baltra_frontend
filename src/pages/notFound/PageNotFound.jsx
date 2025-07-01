import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaFlag } from "react-icons/fa";
import NotFoundImage from "../../assets/images/NotFoundPage.png";

const PageNotFound = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [reported, setReported] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleReport = () => {
    setReported(true);
    alert("Thank you for your feedback. We will look into the issue.");
  };

  return (
    <div className="font-gothamNarrow flex flex-col items-center justify-center min-h-screen p-4 lg:p-8">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow-md text-center">
        <img
          src={NotFoundImage}
          alt="Not Found"
          className="mx-auto mb-6 w-3/4 sm:w-1/2 h-auto"
        />
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-500">
          Page Not Found
        </h1>
        <h4 className="text-gray-700 text-base sm:text-lg mb-4">
          Oops! The page you are looking for might be unavailable or does not
          exist.
        </h4>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center mb-4">
          <Link
            to="/baltra-aboutUs-Page"
            className="bg-red-600 text-white px-4 py-3 rounded-sm hover:bg-red-700 transition duration-300"
          >
            Go to Home
          </Link>
        </div>
        <div className="flex space-x-4 justify-center mt-4">
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition duration-300"
          >
            <FaThumbsUp />
            <span>{likes}</span>
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition duration-300"
          >
            <FaThumbsDown />
            <span>{dislikes}</span>
          </button>
          <button
            onClick={handleReport}
            className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-800 transition duration-300"
            disabled={reported}
          >
            <FaFlag />
            <span>{reported ? "Reported" : "Report"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
