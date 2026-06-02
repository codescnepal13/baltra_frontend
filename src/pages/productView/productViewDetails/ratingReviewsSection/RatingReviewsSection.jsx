import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addRatingReview,
  allRatingsReviewsById,
  clearProductError,
} from "../../../../redux/features/product/productSlice";
import ProductReviewSection from "./productReviewSection/ProductReviewSection";
import StarRating from "./starRating/StarRating";

const RATING_COLORS = {
  5: { bar: "bg-green-500", label: "text-green-700" },
  4: { bar: "bg-lime-500", label: "text-lime-700" },
  3: { bar: "bg-yellow-400", label: "text-yellow-700" },
  2: { bar: "bg-orange-400", label: "text-orange-700" },
  1: { bar: "bg-red-500", label: "text-red-700" },
};

const STAR_LABELS = ["Terrible", "Poor", "Okay", "Good", "Excellent"];

const RatingReviewsSection = () => {
  const dispatch = useDispatch();
  const { isLoading, error, singleProduct, ratingsReviews, statRatingReview } =
    useSelector((state) => state.product);

  const {
    average_rating = 0,
    total_reviews = 0,
    rating_distribution = {},
  } = statRatingReview || {};

  const totalRatings = Object.values(rating_distribution).reduce(
    (acc, c) => acc + c,
    0,
  );

  const { id } = singleProduct || {};
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [reviewErr, setReviewErr] = useState({});

  const validatedForm = () => {
    const errs = {};
    if (!rating) errs.rating = "Please select a rating";
    if (!review.trim()) errs.review = "Please enter your review";
    setReviewErr(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please log in first");
      return;
    }
    if (validatedForm()) {
      dispatch(
        addRatingReview({
          data: { product_id: id, rating, review },
          product_id: id,
          enqueueSnackbar,
        }),
      );
      setRating(0);
      setReview("");
      setReviewErr({});
    } else {
      enqueueSnackbar("Please fix the errors above", { variant: "error" });
    }
  };

  useEffect(() => {
    if (id) dispatch(allRatingsReviewsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  const activeLabel = hovered || rating;

  return (
    <section
      aria-label="Ratings and Reviews"
      className="w-full font-gothamNarrow max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8 p-4 lg:p-8 my-14"
    >
      {/* ── Left: Summary + Reviews ── */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {/* Section heading */}
        <h2 className="text-gray-900 text-xl lg:text-2xl font-bold font-gothamNarrow">
          Ratings &amp; Reviews
        </h2>

        {/* Summary card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-6">
          {/* Big average */}
          <div className="flex flex-col items-center justify-center gap-1 sm:border-r border-gray-100 sm:pr-6 flex-shrink-0">
            <span className="text-5xl font-bold text-gray-900 leading-none">
              {Number(average_rating).toFixed(1)}
            </span>
            <StarRating rating={average_rating} size="lg" />
            <span className="text-xs text-gray-400 mt-1">
              {total_reviews.toLocaleString()} review
              {total_reviews !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Distribution bars */}
          <div className="flex flex-col gap-2 flex-1 justify-center">
            {[5, 4, 3, 2, 1].map((num) => {
              const count = rating_distribution[num] || 0;
              const pct = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
              const colors = RATING_COLORS[num];
              return (
                <div key={num} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-3 text-right flex-shrink-0">
                    {num}
                  </span>
                  <svg
                    className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z" />
                  </svg>
                  {/* Bar track */}
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium w-9 text-right flex-shrink-0 ${colors.label}`}
                  >
                    {Math.round(pct)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews list */}
        <ProductReviewSection ratingsReviews={ratingsReviews} />
      </div>

      {/* ── Right: Submit form ── */}
      <div className="w-full lg:w-1/2 lg:sticky lg:top-8 self-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-gray-900 text-lg font-bold font-gothamNarrow">
              Rate This Product
            </h3>
            <p className="text-gray-400 text-sm font-gothamNarrow mt-0.5">
              Share your experience to help others
            </p>
          </div>

          {/* Interactive star selector */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-700 text-sm font-semibold font-gothamNarrow">
              Your Rating
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="p-0.5 transition-transform duration-100 hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                >
                  <svg
                    className={`w-8 h-8 transition-colors duration-150 ${
                      star <= (hovered || rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z" />
                  </svg>
                </button>
              ))}
              {activeLabel > 0 && (
                <span className="ml-2 text-sm font-semibold text-yellow-600 font-gothamNarrow">
                  {STAR_LABELS[activeLabel - 1]}
                </span>
              )}
            </div>
            {reviewErr.rating && (
              <span className="text-red-500 text-xs font-gothamNarrow">
                {reviewErr.rating}
              </span>
            )}
          </div>

          {/* Review textarea */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="review-text"
              className="text-gray-700 text-sm font-semibold font-gothamNarrow"
            >
              Your Review
            </label>
            <div className="relative">
              <textarea
                id="review-text"
                className={`w-full h-44 p-4 rounded-xl border font-gothamNarrow text-sm text-gray-800
                  placeholder-gray-300 resize-none focus:outline-none transition-colors duration-200
                  ${
                    reviewErr.review
                      ? "border-red-400 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-red-400 bg-gray-50 focus:bg-white"
                  }`}
                placeholder="What did you like or dislike? How was the quality?"
                value={review}
                onChange={(e) => {
                  setReview(e.target.value);
                  if (reviewErr.review)
                    setReviewErr((p) => ({ ...p, review: "" }));
                }}
                maxLength={500}
              />
              <span className="absolute bottom-3 right-3 text-xs text-gray-300 font-gothamNarrow">
                {review.length}/500
              </span>
            </div>
            {reviewErr.review && (
              <span className="text-red-500 text-xs font-gothamNarrow">
                {reviewErr.review}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmitReview}
            disabled={isLoading}
            className="relative w-full h-12 bg-red-600 hover:bg-red-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
              text-white text-sm font-semibold font-gothamNarrow rounded-xl
              transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Submitting…
              </span>
            ) : (
              "Submit Review"
            )}
          </button>

          {!isAuthenticated && (
            <p className="text-center text-xs text-gray-400 font-gothamNarrow -mt-3">
              You must be{" "}
              <span className="text-red-500 font-semibold">logged in</span> to
              submit a review.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(RatingReviewsSection);
