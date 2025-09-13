"use client";

import { Breadcrumb } from "@/app/components";
import ProjectsDashboardWrapper from "@/app/components/Wrappers/ProjectsDashboardWrapper/ProjectsDashboardWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <section className="education h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Education" />
        <Suspense>
          <ProjectsDashboardWrapper />
        </Suspense>{" "}
      </div>
    </section>
  );
};

export default Page;
