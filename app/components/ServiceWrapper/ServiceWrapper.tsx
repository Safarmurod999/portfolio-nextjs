"use client";

import React from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
const ServiceWrapper = ({ array }: { array: any }) => {
  return (
    <ul className="service-wrapper">
      {array.map((service: any, index: number) => (
        <ServiceCard key={index} {...service} />
      ))}
    </ul>
  );
};

export default ServiceWrapper;
