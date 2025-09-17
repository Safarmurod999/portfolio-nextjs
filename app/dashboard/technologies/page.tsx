"use client";

import { Breadcrumb } from "@/app/components";
import TechnologiesWrapper from "@/app/components/Wrappers/dashboard/TechnologiesWrapper/TechnologiesWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <section className="technologies h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Technologies" />
        <Suspense>
          <TechnologiesWrapper />
        </Suspense>{" "}
      </div>
    </section>
  );
};

export default Page;
