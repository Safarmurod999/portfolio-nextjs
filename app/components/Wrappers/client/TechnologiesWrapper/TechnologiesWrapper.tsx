"use client";

import React from "react";
import useConnect from "./connect";
import { TechnologiesCardSkeleton } from "@/app/components/ui/Skeletons";
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
        <ul className="skills__list">
          {Array.from({ length: 10 }).map((_, index) => (
            <TechnologiesCardSkeleton key={index} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TechnologiesWrapper;
