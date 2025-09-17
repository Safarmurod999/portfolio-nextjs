"use client";

import React from "react";
import useConnect from "./connect";
const TechnologiesWrapper = () => {
  const { technologies, technologiesLoading } = useConnect();
  return (
    <>
      {!technologiesLoading && technologies ? (
        <ul className="skills__list">
          {technologies.map((technology) => (
            <li className="skills__list--item" key={technology.id}>
              <div>
                <i
                  className={`${technology.icon} hover:-rotate-[360deg] duration-300`}
                ></i>
              </div>
              <p>{technology.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TechnologiesWrapper;
