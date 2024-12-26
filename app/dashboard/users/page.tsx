"use client";

import { Breadcrumb } from "@/app/components";
import UserWrapper from "@/app/components/Dashboard/UserWrapper/UserWrapper";

const Page = () => {
  return (
    <section className="users h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Users" />
        <UserWrapper />
      </div>
    </section>
  );
};

export default Page;
