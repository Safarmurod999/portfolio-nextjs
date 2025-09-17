const ServiceCardSkeleton = () => {
  return (
    <li className="service-card-skeleton">
      <div>
        <div className="skeleton-h4 shimmer"></div>
        <div className="service-card-content">
          <div className="skeleton-span shimmer"></div>
          <div className="skeleton-p shimmer"></div>
        </div>
      </div>
      <div className="service-card-icon skeleton-icon shimmer"></div>
    </li>
  );
};

export default ServiceCardSkeleton;
