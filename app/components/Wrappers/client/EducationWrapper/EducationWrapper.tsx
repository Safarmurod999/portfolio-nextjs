"use client";

import useConnect from "./connect";
import EducationCard from "./EducationCard";

const EducationWrapper = () => {
  const { education, educationLoading } = useConnect();
  console.log(education);
  
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EducationWrapper;
