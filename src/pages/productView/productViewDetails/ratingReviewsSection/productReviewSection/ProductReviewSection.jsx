import { FaUserCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import StarRating from "../starRating/StarRating";

const getInitials = (first = "", last = "") =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

const AVATAR_COLORS = [
  "bg-red-100 text-red-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
];

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getRatingLabel = (r) =>
  r >= 5
    ? "Excellent"
    : r >= 4
      ? "Very Good"
      : r >= 3
        ? "Good"
        : r >= 2
          ? "Fair"
          : "Poor";

const getRatingColor = (r) =>
  r >= 4
    ? "bg-green-50 text-green-700 border-green-200"
    : r >= 3
      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
      : "bg-red-50 text-red-700 border-red-200";

const ProductReviewSection = ({ ratingsReviews }) => {
  if (!ratingsReviews?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <svg
          className="w-12 h-12 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="text-gray-400 text-sm font-gothamNarrow">
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div className="font-gothamNarrow flex flex-col gap-3">
      <p className="text-xs text-gray-400 font-gothamNarrow mb-1">
        {ratingsReviews.length} review{ratingsReviews.length !== 1 ? "s" : ""}
      </p>

      {ratingsReviews.map((review, index) => {
        const firstName = review?.customer?.first_name || "";
        const lastName = review?.customer?.last_name || "";
        const fullName = `${firstName} ${lastName}`.trim() || "Anonymous";
        const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
        const ratingLabel = getRatingLabel(review.rating);
        const ratingColor = getRatingColor(review.rating);

        return (
          <div
            key={review?.id || index}
            className="flex flex-col gap-3 bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Header row */}
            <div className="flex items-start gap-3">
              {/* Avatar */}
              {review?.customer?.image_url ? (
                <img
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
                  src={review.customer.image_url}
                  alt={fullName}
                />
              ) : firstName ? (
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarColor}`}
                >
                  {getInitials(firstName, lastName)}
                </div>
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-300 flex-shrink-0" />
              )}

              {/* Name + date */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-gray-900 text-sm font-semibold font-gothamNarrow truncate">
                    {fullName}
                  </span>
                  <MdVerified
                    className="text-blue-500 w-3.5 h-3.5 flex-shrink-0"
                    title="Verified Purchase"
                  />
                </div>
                <span className="text-gray-400 text-xs font-gothamNarrow">
                  {formatDate(review.date_joined)}
                </span>
              </div>

              {/* Rating badge */}
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${ratingColor}`}
              >
                {ratingLabel}
              </span>
            </div>

            {/* Stars */}
            <StarRating rating={review.rating} />

            {/* Review text */}
            <p className="text-gray-600 text-sm leading-relaxed font-gothamNarrow">
              {review.review}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductReviewSection;
