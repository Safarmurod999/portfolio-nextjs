import { Breadcrumb } from "@/app/components";
import UserWrapper from "@/app/components/Wrappers/UserWrapper/UserWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Users",
  description: "Users page of Dashboard",
};
const Page = () => {
  return (
    <section className="users h-[100svh]">
      <div className="admin-container">
        <Breadcrumb title="Users" />
        <Suspense>
          <UserWrapper />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
