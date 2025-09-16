"use client";

import { Breadcrumb } from "@/app/components";
import ExperienceWrapper from "@/app/components/Wrappers/ExperienceWrapper/ExperienceWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <section className="experience h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Experience" />
        <Suspense>
          <ExperienceWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
