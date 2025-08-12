import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

/**
 * Render star rating icons based on a numeric rating value.
 * @param {number} rating 
 * @returns {JSX.Element[]} 
 */
export const renderStars = (rating) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const roundedUp = rating % 1 >= 0.75;

    // Full stars
    for (let i = 0; i < (roundedUp ? fullStars + 1 : fullStars); i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    // Half star
    if (!roundedUp && hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    // Empty stars
    while (stars.length < 5) {
        stars.push(
            <FaRegStar key={`empty-${stars.length}`} className="text-yellow-500" />
        );
    }

    return stars;
};
