"use client";
import React from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { AdminNavbar } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { toggleSidebar } = useSelector((state: RootState) => state.state);

  return (
    <>
      <div className="flex admin-layout flex-row min-h-full flex-1 w-full">
        <Sidebar toggleSidebar={toggleSidebar} />
        <main className={`min-h-full ${toggleSidebar ? "admin-content" : ""}`}>
          <AdminNavbar toggleSidebar={toggleSidebar} />
          {children}
        </main>
      </div>
    </>
  );
};

export default RootLayout;
