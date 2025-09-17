import React from "react";
import {
  DetailsWrapper,
  Footer,
  Header,
  PrimaryBtn,
  ProjectsWrapper,
  SecondaryBtn,
  ServiceWrapper,
  Title,
  TopTitle,
  Typography,
} from "./components/index";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaGithubAlt } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

import Circle from "./components/ui/Circle/Circle";
import { skills, education, experience, projects } from "./const/data";

import Image from "next/image";
import Link from "next/link";
import home from "./assets/images/Home/me-3.webp";

import { Metadata } from "next";

import { Toaster } from "sonner";
import TechnologiesWrapper from "./components/Wrappers/client/TechnologiesWrapper/TechnologiesWrapper";
import EducationWrapper from "./components/Wrappers/client/EducationWrapper/EducationWrapper";
import ExperienceWrapper from "./components/Wrappers/client/ExperienceWrapper/ExperienceWrapper";
export const metadata: Metadata = {
  title: "Safarmurod's Portfolio | Home",
  description:
    "Safarmurod is a web developer and passionate about creating digital experiences. He has a strong background in web development and has acquired the skills and knowledge necessary to make your project a success.",
};

const Page = async () => {
  return (
    <>
      <Header />
      <main>
        <section id="home" className="home">
          <div className="container">
            <div className="home__content">
              <h1 className="home__title">Hello I’ m Safarmurod</h1>
              <Typography maxWidth={"582px"}>
                I’m a Web developer & I’m very passionate and dedicated to my
                work. I have acquired the skills and knowledge necessary to make
                your project a success.
              </Typography>
              <div className="home__btns">
                <PrimaryBtn
                  text={"About Me"}
                  link={"#about"}
                  ariaLabel="about-page"
                />
                <div className="home__btn">
                  <a aria-label="portfolio-page" href={"#portfolio"}>
                    My Works
                  </a>
                </div>
              </div>
              <div className="home__social">
                <p>Follow Me</p>
                <ul className="home__links">
                  <li>
                    <a
                      href="https://t.me/UrinovSafarmurod"
                      target="blank"
                      aria-label="telegram"
                    >
                      <FaTelegramPlane className="hover:-rotate-[360deg] duration-300" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/safarmurodurinov"
                      aria-label="facebook"
                    >
                      <FaFacebookF className="hover:-rotate-[360deg] duration-300" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.github.com/Safarmurod999"
                      aria-label="github"
                    >
                      <FaGithubAlt className="hover:-rotate-[360deg] duration-300" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/safarmurod0904"
                      aria-label="instagram"
                    >
                      <FaInstagram className="hover:-rotate-[360deg] duration-300" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/safarmurod999/"
                      aria-label="linkedin"
                    >
                      <FaLinkedinIn className="hover:-rotate-[360deg] duration-300" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="home__image">
              <Image
                src={home}
                alt="My picture"
                width={600}
                height={600}
                priority
              />
              <div className="circular">
                <Circle
                  text={"Download - CV Download - CV "}
                  link={"/assets/files/safarmurod-cv.pdf"}
                  id={"third"}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="services">
          <div className="container">
            <div className="services__content">
              <TopTitle>Services</TopTitle>
              <Title>Services i offer</Title>
              <Typography maxWidth={"640px"}>
                Donec imperdiet risus at tortor consequat maximus et eget magna.
                Cras ornare sagittis augue, id sollicitudin justo tristique ut.
              </Typography>
              <SecondaryBtn text={"All Services"} link={"/services"} />
            </div>
            <div className="services__details">
              <ServiceWrapper />
            </div>
          </div>
        </section>
        <section id="about" className="about">
          <div className="container">
            <div className="about__content">
              <TopTitle>I am a web developer</TopTitle>
              <Title>About Me</Title>
              <Typography
                maxWidth={"581px"}
                color={"var(--text-light-color)"}
                fontWeight="400"
              >
                My name is Safarmurod. I have been studying Full stack
                development since November 2022. I like creating a cool full
                stack projects.
              </Typography>
              <Typography
                maxWidth={"630px"}
                color={"var(--text-light-color)"}
                fontWeight="400"
              >
                Donec imperdiet risus at tortor consequat maximus et eget magna.
                Cras ornare sagittis augue, id sollicitudin justo tristique ut.
                Nullam ex enim, euismod vel bibendum ultrices, fringilla vel
                eros. Donec euismod leo lectus, et euismod metus euismod sed.
                Quisque quis suscipit ipsum, at pellentesque velit. Duis a
                congue sem.
              </Typography>
            </div>
            <div className="about__skills">
              <Link aria-label="about-page" href={"/about"}>
                My Skills
              </Link>
              <TechnologiesWrapper />
            </div>
          </div>
        </section>
        <section id="details" className="details">
          <div className="container">
            <EducationWrapper />
            <ExperienceWrapper/>
          </div>
        </section>
        <section id="portfolio" className="projects">
          <div className="container">
            <div className="projects__title">
              <TopTitle>My Works Portfolio</TopTitle>
              <Title>My Projects</Title>
            </div>
            <ProjectsWrapper array={projects} type="half" />
          </div>
          <div className="container">
            <PrimaryBtn
              text={"See More"}
              ariaLabel={"portfolio"}
              link={"/portfolio"}
            />
          </div>
        </section>
      </main>
      <Toaster />
      <Footer />
    </>
  );
};

export default Page;
