"use client";

import React from "react";
import ProjectsCard from "./ProjectsCard";
import { ProjectInnerProps, ProjectWrapperProps } from "@/app/types/types";
const ProjectsWrapper = ({ array, type }: ProjectWrapperProps) => {
  return (
    <ul className="projects-list">
      {array.map((el: ProjectInnerProps) => {
        if (type == "half") {
          if (el.id < 6) {
            return (
              <ProjectsCard
                id={el.id}
                key={el.id}
                image={el.image}
                url={el.url}
                title={el.title}
                data={el.data}
              />
            );
          }
        } else {
          return (
            <ProjectsCard
              id={el.id}
              key={el.id}
              image={el.image}
              url={el.url}
              title={el.title}
              data={el.data}
            />
          );
        }
      })}
    </ul>
  );
};

export default ProjectsWrapper;
