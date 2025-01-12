"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import ThemeSwitcher from "../../Layout/Header/ThemeSwitcher";
import { useDispatch } from "react-redux";
import { handleSidebar } from "@/app/store/stateSlice";

const AdminNavbar = ({ toggleSidebar }: { toggleSidebar: boolean }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={`admin-navbar ${toggleSidebar ? "navbar-toggle" : ""}`}>
      <div
        className="cursor-pointer admin-toggle"
        onClick={() => dispatch(handleSidebar())}
      >
        <IoMenuSharp />
      </div>
      <div className="flex items-center justify-between gap-[10px]">
        <div className="admin-navbar--theme">
          <ThemeSwitcher />
        </div>
        <div className="admin-dropdown">
          <div className="admin-avatar" onClick={toggleMenu}>
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="avatar"
            />
          </div>
          <div
            ref={menuRef}
            className={`admin-avatar-menu ${isOpen ? "toggle" : ""}`}
          >
            <ul>
              <li onClick={() => setIsOpen(false)}>
                <Link href={"/dashboard/profile"}>Profile</Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link href={"/dashboard/settings"}>Settings</Link>
              </li>
              <li onClick={() => setIsOpen(false)}>
                <Link href={"/"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
