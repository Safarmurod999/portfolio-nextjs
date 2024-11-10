"use client";

import React from "react";
import ServiceCard from "./ServiceCard";
import { ServiceCardProps, ServiceWrapperProps } from "@/app/types/types";
const ServiceWrapper = ({ array }: ServiceWrapperProps) => {
  return (
    <ul className="service-wrapper">
      {array.map((service: ServiceCardProps, index: number) => (
        <ServiceCard key={index} {...service} />
      ))}
    </ul>
  );
};

export default ServiceWrapper;
