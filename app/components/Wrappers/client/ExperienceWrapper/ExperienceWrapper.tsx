"use client";

import DetailsCardSkeleton from "@/app/components/ui/Skeletons/DetailsCardSkeleton";
import useConnect from "./connect";
import ExperienceCard from "./ExperienceCard";

const ExperienceWrapper = () => {
  const { experience, experienceLoading } = useConnect();
  return (
    <div className="details-wrapper">
      <h2 className="details-title">Experience</h2>
      {!experienceLoading && experience?.length ? (
        <ul className="details-list">
          {experience.map((el) => {
            return (
              <ExperienceCard
                key={el.id}
                company={el.company}
                jobTitle={el.jobTitle}
                date={el.date}
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

export default ExperienceWrapper;
