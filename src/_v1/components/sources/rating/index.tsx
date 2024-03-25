import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

interface Props {
  payload: (val: number) => void;
}

const RatingContainer = ({ payload }: Props) => {
  // Catch Rating value
  const handleRating = (rate: number) => {
    payload(rate);
  };
  // Optinal callback functions

  const tooltipArray = [
    "Terrible",
    "Terrible+",
    "Bad",
    "Bad+",
    "Average",
    "Average+",
    "Great",
    "Great+",
    "Awesome",
    "Awesome+",
  ];
  const fillColorArray = [
    "#0048e6",
    "#0040dc",
    "#0038d2",
    "#0030c8",
    "#0028be",
    "#0020b4",
    "#0018aa",
    "#0010a0",
    "#000896",
    "#00008c",
  ];

  return (
    <div className="custon-rating">
      <Rating
        onClick={handleRating}
        /* Available Props */
        size={20}
        transition
        allowFraction
        showTooltip
        tooltipDefaultText="Your Rate"
        tooltipArray={tooltipArray}
        // fillColorArray={fillColorArray}
        fillColor="#0048e6"
      />
    </div>
  );
};

export default RatingContainer;
