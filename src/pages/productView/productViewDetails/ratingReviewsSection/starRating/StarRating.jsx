import React from "react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <svg
          key={`full-${index}`}
          className="w-3 h-3 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z" />
        </svg>
      ))}
      {/* Half star */}
      {halfStar && (
        <svg
          key="half"
          className="w-3 h-3 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="gray" />
            </linearGradient>
          </defs>
          <path
            d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z"
            fill="url(#half-grad)"
          />
        </svg>
      )}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={`empty-${index}`}
          className="w-3 h-3 text-gray-300 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
