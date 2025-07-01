import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const ProductReviewSection = ({ ratingsReviews }) => {
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    const stars = [];

    // Filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <AiFillStar key={`star-${i}`} className="mr-1 text-yellow-500" />
      );
    }

    // Half star if applicable
    if (halfStar) {
      stars.push(
        <AiFillStar key={`star-half`} className="mr-1 text-yellow-500" />,
        <AiFillStar key={`star-half-empty`} className="mr-1 text-gray-400" />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <AiFillStar key={`star-empty-${i}`} className="mr-1 text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <div className="font-gothamNarrow flex flex-col gap-4 mt-12 px-2 lg:px-8">
      {ratingsReviews && ratingsReviews.length > 0 ? (
        ratingsReviews?.map((review, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 bg-white p-4 rounded-sm shadow-sm"
          >
            <div className="flex items-center gap-4">
              {review?.customer?.image_url ? (
                <img
                  className="w-10 h-10 rounded-full sm:w-12 sm:h-12 font-gothamNarrow"
                  src={review?.customer?.image_url}
                  alt={`${review.customer.first_name} ${review.customer.last_name}`}
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-500 sm:w-10 sm:h-10" />
              )}
              <div className="text-black text-sm sm:text-base font-semibold font-gothamNarrow">
                {`${review.customer.first_name} ${review.customer.last_name}`}
              </div>
              <div className="flex justify-center items-center w-8 h-8 ml-auto sm:w-10 sm:h-10">
                <HiOutlineDotsVertical className="text-gray-500" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 font-gothamNarrow">
              {renderStars(review.rating)}
              <span className="ml-2">
                {new Date(review.date_joined).toLocaleDateString()}
              </span>
            </div>
            <div className="text-gray-700 text-sm sm:text-base font-gothamNarrow">
              {review.review}
            </div>
          </div>
        ))
      ) : (
        <span className="text-gray-500 text-sm font-gothamNarrow">
          No Data Found
        </span>
      )}
    </div>
  );
};

export default ProductReviewSection;
