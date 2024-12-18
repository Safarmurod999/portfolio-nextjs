import { Breadcrumb } from "@/app/components";
import React from "react";

const Page = async () => {

  return (
    <section className="users">
      <div className="admin-container">
        <Breadcrumb />
        <div className="dashboard-title">Users</div>
      </div>
    </section>
  );
};

export default Page;
