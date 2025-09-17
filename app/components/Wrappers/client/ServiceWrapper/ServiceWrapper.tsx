"use client";

import React from "react";
import ServiceCard from "./ServiceCard";
import useConnect from "./connect";
import ServiceCardSkeleton from "@/app/components/ui/Skeletons/ServiceCardSkeleton";
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
        <ul className="service-wrapper">
          <ServiceCardSkeleton key={1} />
          <ServiceCardSkeleton key={2} />
          <ServiceCardSkeleton key={3} />
          <ServiceCardSkeleton key={4} />
        </ul>
      )}
    </>
  );
};

export default ServiceWrapper;
