import React from "react";

const TechnologiesCardSkeleton = () => {
  return (
    <li className="skills__list--item-skeleton">
      <div className="skeleton-icon shimmer"></div>
      <div className="skeleton-text shimmer"></div>
    </li>
  );
};

export default TechnologiesCardSkeleton;
