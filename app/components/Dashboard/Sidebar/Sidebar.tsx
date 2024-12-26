"use client";
import React, { useState } from "react";
import { IoCloseSharp, IoPersonOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosStats } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { handleSidebar } from "@/app/store/stateSlice";

const adminRoutes = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: <IoIosStats />,
  },
  {
    id: 2,
    name: "Users",
    path: "/dashboard/users",
    icon: <IoPersonOutline />,
  },
  {
    id: 3,
    name: "Categories",
    path: "/dashboard/categories",
    icon: <BiCategory />,
  },
];

const Sidebar = ({ toggleSidebar }: { toggleSidebar: boolean }) => {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState(pathname || 0);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <aside className={`sidebar ${toggleSidebar ? "toggle-sidebar" : ""}`}>
      <div className="relative">
        <div className="sidebar__logo">
          <Link href="/" className="text-white">
            Urinov<span className="text-primary">.</span>
          </Link>
        </div>
        <IoCloseSharp
          className="sidebar__close xl:hidden"
          onClick={() => dispatch(handleSidebar())}
        />
      </div>

      <div className="nav">
        {adminRoutes.map((item) => {
          return (
            <Link
              key={item.id}
              className={`nav-item ${
                activeRoute === item.path ? "active" : ""
              }`}
              href={item.path}
              onClick={() => setActiveRoute(item.path)}
            >
              <span className="icon">{item.icon}</span>
              <span className="nav-item-name">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
