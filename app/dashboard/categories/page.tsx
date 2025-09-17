"use client";

import { Breadcrumb } from "@/app/components";
import CategoriesWrapper from "@/app/components/Wrappers/dashboard/CategoriesWrapper/CategoriesWrapper";
import { Suspense } from "react";

const Page = () => {
  return (
    <section className="categories h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Categories" />
        <Suspense>
          <CategoriesWrapper />
        </Suspense>{" "}
      </div>
    </section>
  );
};

export default Page;
