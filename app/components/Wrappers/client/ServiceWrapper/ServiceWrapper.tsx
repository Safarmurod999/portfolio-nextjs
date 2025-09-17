"use client";

import React from "react";
import ServiceCard from "./ServiceCard";
import useConnect from "./connect";
const ServiceWrapper = () => {
  const { services, servicesLoading } = useConnect();
  return (
    <>
      {!servicesLoading && services ? (
        <ul className="service-wrapper">
          {services.map((service: ServiceCardProps, index: number) => (
            <ServiceCard
              key={index}
              id={index}
              name={service.name}
              category={service.category}
            />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ServiceWrapper;
