"use client";

import { Breadcrumb } from "@/app/components";
import EducationWrapper from "@/app/components/Wrappers/dashboard/EducationWrapper/EducationWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <section className="education h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Education" />
        <Suspense>
          <EducationWrapper />
        </Suspense>{" "}
      </div>
    </section>
  );
};

export default Page;
