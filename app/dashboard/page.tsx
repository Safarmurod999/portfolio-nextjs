import { Metadata } from "next";
import { Breadcrumb } from "../components";

export const metadata: Metadata = {
  title: "Safarmurod's Portfolio | Dashboard",
  description:
    "Safarmurod is a web developer and passionate about creating digital experiences. He has a strong background in web development and has acquired the skills and knowledge necessary to make your project a success.",
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
