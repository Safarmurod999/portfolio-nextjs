"use client";

import DetailsCard from "./DetailsCard";

const DetailsWrapper = ({ array, title }: DetailsWrapperProps) => {
  return (
    <div className="details-wrapper">
      <h2 className="details-title">{title}</h2>
      <ul className="details-list">
        {array.map((el: ElementProps) => {
          return (
            <DetailsCard
              id={el.id}
              key={el.id}
              data={el.data}
              title={el.title}
              time={el.time}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default DetailsWrapper;
