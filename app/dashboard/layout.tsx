import { Metadata } from "next";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { AdminNavbar } from "../components";

export const metadata: Metadata = {
  title: "Safarmurod's Portfolio | Dashboard",
  description:
    "Safarmurod is a web developer and passionate about creating digital experiences. He has a strong background in web development and has acquired the skills and knowledge necessary to make your project a success.",
};
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="flex admin-layout flex-row min-h-full flex-1 w-full">
        <Sidebar />
        <main className={`min-h-full`}>
          <AdminNavbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default RootLayout;
