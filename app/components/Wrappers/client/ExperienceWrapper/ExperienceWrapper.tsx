"use client";

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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExperienceWrapper;
