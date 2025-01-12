"use client";

import { Breadcrumb } from "@/app/components";
import LeadsWrapper from "@/app/components/Dashboard/LeadsWrapper/LeadsWrapper";

const Page = () => {
  return (
    <section className="leads h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Leads" />
        <LeadsWrapper />
      </div>
    </section>
  );
};

export default Page;
