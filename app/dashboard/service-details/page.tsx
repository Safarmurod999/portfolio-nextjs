"use client";

import { Breadcrumb } from "@/app/components";
import ServiceDetailsWrapper from "@/app/components/Wrappers/ServiceDetailsWrapper/ServicesDetailsWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <section className="service-details h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Service details" />
        <Suspense>
          <ServiceDetailsWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
