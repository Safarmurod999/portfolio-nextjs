import { Breadcrumb } from "@/app/components";
import UserWrapper from "@/app/components/Dashboard/UserWrapper/UserWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Users",
  description:
    "Users page of Dashboard",
};
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
