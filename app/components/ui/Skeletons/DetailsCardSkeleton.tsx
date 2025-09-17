import React from "react";

const DetailsCardSkeleton = () => {
  return (
    <li className="details-item-skeleton" data-aos="fade-up">
      <div className="skeleton-time shimmer"></div>
      <div className="details-data">
        <div className="skeleton-h shimmer"></div>
        <div className="skeleton-p shimmer"></div>
      </div>
    </li>
  );
};

export default DetailsCardSkeleton;
