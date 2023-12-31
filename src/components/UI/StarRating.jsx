/* eslint-disable react/prop-types */
import { useState } from "react";

// Stars Container Style
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starsContainerStyle = {
  display: "flex",
};

export default function StarRating({
  maxRating = 5,
  size = 48,
  color = "#fcc149",
  className = "",
  ratingResultsMessages = [],
  defaultRating = 0,
  onRating = () => {},
  shwoRatingResult,
}) {
  const [maxRatingResult, setMaxRatingResult] = useState(defaultRating);
  const [maxHighlightedStarNumber, setMaxHighlightedStarNumber] = useState(0);

  const maxRatingResultStyle = {
    margin: "0",
    lineHeight: "1",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const clickHandler = (starIndex) => {
    setMaxRatingResult(starIndex);
    onRating(starIndex);
  };

  const mouseEnterHandler = (starIndex) => {
    setMaxHighlightedStarNumber(starIndex);
  };

  const mouseLeaveHandler = () => {
    setMaxHighlightedStarNumber(0);
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          const currentStar = i + 1;
          let highlighted = maxHighlightedStarNumber
            ? currentStar <= maxHighlightedStarNumber
            : currentStar <= maxRatingResult;

          return (
            <Star
              onClick={clickHandler.bind(null, currentStar)}
              key={i}
              onMouseEnter={mouseEnterHandler.bind(null, currentStar)}
              onMouseLeave={mouseLeaveHandler}
              isHighlighted={highlighted}
              size={size}
              color={color}
            />
          );
        })}
      </div>
      {shwoRatingResult && (
        <p style={maxRatingResultStyle}>
          {ratingResultsMessages.length === maxRating
            ? ratingResultsMessages[
                maxHighlightedStarNumber
                  ? maxHighlightedStarNumber - 1
                  : maxRatingResult - 1
              ]
            : maxHighlightedStarNumber || maxRatingResult || ""}
        </p>
      )}
    </div>
  );
}

function Star({ isHighlighted, color, size, ...rset }) {
  // Star Style
  const starStyle = {
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span role="button" style={starStyle} {...rset}>
      {isHighlighted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
