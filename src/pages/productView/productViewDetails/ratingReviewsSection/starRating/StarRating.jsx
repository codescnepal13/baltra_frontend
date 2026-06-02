import { useId } from "react";

const StarRating = ({ rating, size = "sm" }) => {
  const id = useId();
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";

  const StarPath = () => (
    <path d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z" />
  );

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className={`${sizeClass} text-yellow-400 fill-current`}
          viewBox="0 0 20 20"
        >
          <StarPath />
        </svg>
      ))}
      {hasHalf && (
        <svg
          key="half"
          className={`${sizeClass} fill-current`}
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`half-${id}`}>
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z"
            fill={`url(#half-${id})`}
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className={`${sizeClass} text-gray-300 fill-current`}
          viewBox="0 0 20 20"
        >
          <StarPath />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
