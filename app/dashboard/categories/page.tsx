"use client";

import { Breadcrumb } from "@/app/components";
import CategoriesWrapper from "@/app/components/Dashboard/CategoriesWrapper/CategoriesWrapper";

const Page = () => {
  return (
    <section className="categories h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Categories" />
        <CategoriesWrapper />
      </div>
    </section>
  );
};

export default Page;
