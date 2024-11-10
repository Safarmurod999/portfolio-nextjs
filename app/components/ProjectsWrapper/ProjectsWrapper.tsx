"use client";

import React from "react";
import ProjectsCard from "./ProjectsCard";
const ProjectsWrapper = ({ array }: any) => {
  return (
    <ul className="projects-list">
      {array.map((el: any) => {
        if (el.id < 6) {
          return (
            <ProjectsCard id={el.id} image={el.image} title={el.title} url={el.url} data={el.data}/>
          );
        }
      })}
    </ul>
  );
};

export default ProjectsWrapper;
