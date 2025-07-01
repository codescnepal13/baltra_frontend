import React, { useEffect, useState } from "react";
import StarRating from "./starRating/StarRating";
import ProductReviewSection from "./productReviewSection/ProductReviewSection";
import { useSelector, useDispatch } from "react-redux";
import {
  addRatingReview,
  allRatingsReviewsById,
  clearProductError,
} from "../../../../redux/features/product/productSlice";
import { toast } from "react-toastify";

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
    (acc, count) => acc + count,
    0
  );

  const colorMap = {
    1: "#E74C3C", // Red for 1 star
    2: "#F39C12", // Orange for 2 stars
    3: "#F1C40F", // Yellow for 3 stars
    4: "#2ECC71", // Green for 4 stars
    5: "#1E8449", // Darker green for 5 stars
  };

  const { id } = singleProduct || {};
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewErr, setReviewErr] = useState({});

  const validatedForm = () => {
    const newErrors = {};
    if (!rating) newErrors.rating = "Please select a rating";
    if (!review) newErrors.review = "Please enter your review";

    setReviewErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please log in first");
      return;
    }

    if (validatedForm()) {
      const data = {
        product_id: id,
        rating,
        review,
      };

      dispatch(addRatingReview({ data, product_id: id, toast }));

      setRating(0);
      setReview("");
    } else {
      toast.warn("Invalid Input");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(allRatingsReviewsById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error();
      dispatch(clearProductError());
    }
  }, [dispatch, error]);

  return (
    <div className="w-full font-gothamNarrow max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8 p-4 lg:p-8 my-14">
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <div className="text-center text-black text-xl lg:text-2xl font-semibold leading-tight font-gothamNarrow">
          Ratings and Reviews
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center flex-1">
            <div className="text-black text-lg font-semibold font-gothamNarrow">
              Total Reviews
            </div>
            <div className="text-black text-xl font-normal font-gothamNarrow">
              {total_reviews?.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="text-black text-3xl font-semibold font-gothamNarrow">
              {average_rating?.toFixed(1)}
            </div>
            <StarRating rating={average_rating} />
            <div className="text-black text-sm my-2 font-gothamNarrow">
              {statRatingReview?.rating_sum}
            </div>
          </div>
          <div className="relative w-full lg:w-[256px]">
            <div className="absolute left-0 top-0 flex flex-col gap-2 font-gothamNarrow w-1/2">
              {[5, 4, 3, 2, 1].map((num) => {
                const count = rating_distribution[num] || 0;
                const widthPercentage =
                  totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                const barColor = count > 0 ? colorMap[num] : "#E7E7E7";
                const barStyle =
                  count > 0
                    ? {
                        width: `${widthPercentage}%`,
                        backgroundColor: barColor,
                      }
                    : {};

                return (
                  <div
                    key={num}
                    className="flex items-center gap-2 justify-center"
                  >
                    <span className="text-black text-sm font-semibold">
                      {num}
                    </span>
                    {count > 0 ? (
                      <div
                        style={barStyle}
                        className="h-2 flex items-center rounded-[8px]"
                      >
                        <span className="text-black text-xs ml-2">{`${widthPercentage.toFixed(
                          1
                        )}%`}</span>
                      </div>
                    ) : (
                      <div className="h-[10px] w-full bg-gray-300 rounded-[8px]"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-24 sm:mt-0">
          <ProductReviewSection ratingsReviews={ratingsReviews} />
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-4 flex flex-col gap-8 bg-white rounded-md shadow-md">
        <div className="w-full flex flex-col gap-2">
          <div className="text-black text-xl font-semibold font-gothamNarrow">
            Rate This Product
          </div>
          <div className="text-[#515151] text-sm font-gothamNarrow">
            Please share your experience with us
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 font-gothamNarrow">
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 cursor-pointer ${
                  rating > index ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                onClick={() => handleStarClick(index + 1)}
              >
                <path d="M10 15l-6.16 3.24L5.5 10.97.84 6.76 7.24 5.85 10 0l2.76 5.85 6.4.91-4.66 4.21L16.16 18z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-black text-base font-normal font-gothamNarrow">
            Your Review
          </div>
          <textarea
            className="w-full h-[204px] p-4 rounded-sm border font-gothamNarrow focus:outline-none focus:border-red-500 border-[#D1D1D1] text-black text-base"
            placeholder="Write your comments here"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          {reviewErr && (
            <span className="text-red-600 text-sm font-gothamNarrow">
              {reviewErr.review}
            </span>
          )}
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <button
            className="w-full h-[48px] font-gothamNarrow px-4 py-2 bg-red-600 hover:bg-[#D03030] text-white text-base rounded-sm"
            onClick={handleSubmitReview}
            disabled={isLoading}
          >
            {isLoading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              </span>
            )}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingReviewsSection;
