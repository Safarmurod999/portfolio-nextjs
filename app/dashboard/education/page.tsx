"use client";

import { Breadcrumb } from "@/app/components";
import EducationWrapper from "@/app/components/Dashboard/EducationWrapper/EducationWrapper";

const Page = () => {
  return (
    <section className="education h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Education" />
        <EducationWrapper />
      </div>
    </section>
  );
};

export default Page;
