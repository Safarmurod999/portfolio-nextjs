"use client";

import React, { useEffect, useState } from "react";
import ProjectsCard from "./ProjectsCard";
import { ProjectInnerProps, ProjectWrapperProps } from "@/app/types/types";
const ProjectsWrapper = ({ array, type }: ProjectWrapperProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/projects");
        
        const data = await response.json();
        setProjectsData(data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(projectsData);
  
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
