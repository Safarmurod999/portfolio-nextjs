"use client";

import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

const ServiceCard = ({ id, category, name }: ServiceCardProps) => {
  return (
    <li className="service-card">
      <div>
        <h4>0{id + 1}/</h4>
        <div className="service-card-content">
          <span>{category.name}</span>
          <p>{name}</p>
        </div>
      </div>
      <Link
        aria-label="page-link"
        href={"/services"}
        className="service-card-icon"
      >
        <GoArrowUpRight />
      </Link>
    </li>
  );
};

export default ServiceCard;
