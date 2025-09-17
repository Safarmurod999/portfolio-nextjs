"use client";

import useConnect from "./connect";
import EducationCard from "./EducationCard";
import DetailsCardSkeleton from "@/app/components/ui/Skeletons/DetailsCardSkeleton";

const EducationWrapper = () => {
  const { education, educationLoading } = useConnect();

  return (
    <div className="details-wrapper">
      <h2 className="details-title">Education</h2>
      {!educationLoading && education?.length ? (
        <ul className="details-list">
          {education.map((el) => {
            return (
              <EducationCard
                key={el.id}
                name={el.name}
                place={el.place}
                time={el.date}
              />
            );
          })}
        </ul>
      ) : (
        <ul className="details-list">
          {Array.from({ length: 3 }).map((_, index) => (
            <DetailsCardSkeleton key={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default EducationWrapper;
