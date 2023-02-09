import * as React from "react";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

type ProductReviewProps = {
  rating?: number;
  reviewCount?: number;
  max?: number;
};

export const ProductReview = ({ rating }: ProductReviewProps) => {
  const [numStars, setNumStars] = useState([0, 0]);

  useEffect(() => {
    const ratingParts = rating?.toString().split(".");
    if (ratingParts) {
      if (ratingParts.length === 1) {
        setNumStars([Number(ratingParts[0]), 0]);
      } else {
        const decicmalPart = Number(ratingParts[1]);
        if (decicmalPart < 2) {
          setNumStars([Number(ratingParts[0]), 0]);
        } else if (decicmalPart > 2 && decicmalPart < 7) {
          setNumStars([Number(ratingParts[0]), 1]);
        } else {
          setNumStars([Number(ratingParts[0]) + 1, 0]);
        }
      }
    }
  }, [rating]);

  return (
    <div className="flex text-toast-orange mt-1 mb-4">
      {[...Array(numStars[0])].map((_, i) => (
        <FaStar key={`star-${i}`} size={16} />
      ))}
      {numStars[1] === 1 && <FaStarHalf size={16} />}
    </div>
  );
};
