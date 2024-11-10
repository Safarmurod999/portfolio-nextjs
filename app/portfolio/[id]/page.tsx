"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { projects } from "../../const/data";
import "../../styles/app.scss";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
const ProjectInner = () => {
  const { id } = useParams();

  return (
    <main>
      <section id="project" className="project">
        <div className="container">
          <div className="project-navigation">
            <Link href="/portfolio" aria-label="back">
              home / portfolio / {id}
            </Link>
            <Link href="/portfolio" aria-label="back" className="primary-btn">
              Ortga
            </Link>
          </div>
          {projects.map((el: any) => {
            if (el.id == id) {
              return (
                <div
                  key={el.id}
                  className="project-detail flex items-stretch justify-between gap-[20px]"
                >
                  <Image
                    src={el.image}
                    alt={`${el.id}`}
                    width={600}
                    height={400}
                    priority
                  />
                  <div className="projects-data grow">
                    <h3>{el.title}</h3>
                    <p>{el.data}</p>
                    <Link
                      href={el.url}
                      target="_blank"
                      aria-label="page"
                      className="flex items-center gap-[5px] group"
                    >
                      <span className="group-hover:mr-[5px] duration-200">Sayt Havolasi</span>
                      <FaArrowRightLong className="duration-200" />
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
    </main>
  );
};

export default ProjectInner;
