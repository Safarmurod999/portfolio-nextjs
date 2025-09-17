"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { Title } from "../../components";
import useConnect from "./connect";

const Page = () => {
  const [active, setActive] = useState(4);
  const { services, servicesLoading, serviceDetails, serviceDetailsLoading } =
    useConnect();
  console.log(active);

  if (serviceDetails) {
    console.log(serviceDetails.filter((item) => item.service.id == active));
  }

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
              {!servicesLoading &&
                services &&
                services.map((service) => (
                  <li
                    key={service.id}
                    className={`service__list--item ${
                      service.id == active && "active"
                    }`}
                    onClick={() => setActive(service.id)}
                  >
                    {service.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className={`service__tab active`}>
            <Title>Website Development</Title>
            <ul className="service__tab--list">
              {!serviceDetailsLoading &&
                serviceDetails &&
                serviceDetails
                  .filter((item) => item.service.id == active)
                  .map((item, index) => {
                    return (
                      <li className="service__tab--item" key={item.id}>
                        <div>
                          <h4>{index + 1}/</h4>
                          <div className="service__tab--item-content">
                            <span>{item.name}</span>
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
                    );
                  })}
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
