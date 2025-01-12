import { Metadata } from "next";
import { Breadcrumb } from "../components";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Dashboard page of Admin Panel",
};

const Page = () => {
  return (
    <section className="dashboard">
      <div className="admin-container">
        <Breadcrumb title="Dashboard" />
      </div>{" "}
    </section>
  );
};

export default Page;
