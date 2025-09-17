"use client";

import { Breadcrumb } from "@/app/components";
import ServicesDashboardWrapper from "@/app/components/Wrappers/dashboard/ServicesWrapper/ServicesWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <section className="education h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Education" />
        <Suspense>
          <ServicesDashboardWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
