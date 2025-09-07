"use client"
import React, { useState } from "react";
import Link from "next/link";
import { services } from "../../const/data";
import { GoArrowUpRight } from "react-icons/go";
import { Title } from "../../components";

const Page = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      <section className="service__top">
        <div className="container">
          <Title>Service Details</Title>
          <Link href={"/"} aria-label="home" className="service__subtitle">
            Home /<span> Service Details</span>
          </Link>
        </div>
      </section>
      <section className="service__details">
        <div className="container">
          <div className="service__links">
            <div className="service__links--title">Service List</div>
            <ul className="service__list">
              {services.map((service) => (
                <li
                  key={service.id}
                  className={`service__list--item ${
                    service.id == active && "active"
                  }`}
                  onClick={() => setActive(service.id)}
                >
                  {service.description}
                </li>
              ))}
            </ul>
          </div>
          <div className={`service__tab ${active == 0 && "active"}`}>
            <Title>Website Development</Title>
            <ul className="service__tab--list">
              <li className="service__tab--item">
                <div>
                  <h4>01/</h4>
                  <div className="service__tab--item-content">
                    <span>E-commerce website</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>02/</h4>
                  <div className="service__tab--item-content">
                    <span>Landing page</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>03/</h4>
                  <div className="service__tab--item-content">
                    <span>Portfolio website</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://www.safarmurod.uz/"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>04/</h4>
                  <div className="service__tab--item-content">
                    <span>Educational website</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"http://meelon.uz"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
            </ul>
          </div>
          <div className={`service__tab ${active == 1 && "active"}`}>
            <Title>Telegram Bot Development</Title>
            <ul className="service__tab--list">
              <li className="service__tab--item">
                <div>
                  <h4>01/</h4>
                  <div className="service__tab--item-content">
                    <span>E-commerce bot</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>02/</h4>
                  <div className="service__tab--item-content">
                    <span>Subsctiption bot</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>03/</h4>
                  <div className="service__tab--item-content">
                    <span>Registration bot</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://www.safarmurod.uz/"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>04/</h4>
                  <div className="service__tab--item-content">
                    <span>Editor bot</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"http://meelon.uz"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
            </ul>
          </div>
          <div className={`service__tab ${active == 2 && "active"}`}>
            <Title>Web Apps Development</Title>
            <ul className="service__tab--list">
              <li className="service__tab--item">
                <div>
                  <h4>01/</h4>
                  <div className="service__tab--item-content">
                    <span>CRM system</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>02/</h4>
                  <div className="service__tab--item-content">
                    <span>ERP system</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>03/</h4>
                  <div className="service__tab--item-content">
                    <span>CMS web apps</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://www.safarmurod.uz/"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>04/</h4>
                  <div className="service__tab--item-content">
                    <span>Business web apps</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"http://meelon.uz"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
            </ul>
          </div>
          <div className={`service__tab ${active == 3 && "active"}`}>
            <Title>REST API for E-commerce</Title>
            <ul className="service__tab--list">
              <li className="service__tab--item">
                <div>
                  <h4>01/</h4>
                  <div className="service__tab--item-content">
                    <span>CRM system backend</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>02/</h4>
                  <div className="service__tab--item-content">
                    <span>Online store backend</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://nisa-ui-kit.netlify.app"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>03/</h4>
                  <div className="service__tab--item-content">
                    <span>CMS web apps backend</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"https://www.safarmurod.uz/"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
              <li className="service__tab--item">
                <div>
                  <h4>04/</h4>
                  <div className="service__tab--item-content">
                    <span>Online ordering backend</span>
                  </div>
                </div>
                <a
                  aria-label="page-link"
                  href={"http://meelon.uz"}
                  className="service__tab--item-icon"
                >
                  <GoArrowUpRight />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
