import React from "react";
import { Metadata } from "next";
import { projects } from "../const/data";
import "../styles/app.scss";
import { Footer, Header, ProjectsWrapper, Title } from "../components";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safarmurod's Portfolio | Projects",
  description:
    "Projects page of Safarmurod's Portfolio. Ther are some projects that I have done.",
};

const Portfolio = () => {
  return (
    <>
      <Header />
      <main>
        <section className="portfolio-top">
          <div className="container flex flex-col items-center">
            <Title>All Projects</Title>
            <Link href={"/"} aria-label="home" className="service__subtitle">
              Home / <span>Portfolio</span>
            </Link>
          </div>
        </section>
        <section id="portfolio">
          <div className="container">
            <ProjectsWrapper array={projects} type="full" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
