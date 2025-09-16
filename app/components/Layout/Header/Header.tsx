"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, PrimaryBtn } from "../../index";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const [open, setOpen] = useState({
    first: false,
    second: false,
    third: false,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 20) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header>
      <nav className={`navbar ${!show && "shrink"}`}>
        <div className="container">
          <div className="navbar__logo">
            <Link href="/">
              Urinov<span>.</span>
            </Link>
          </div>
          <div className={`navbar__menu ${menuOpen ? "open" : ""}`}>
            <ul className="navbar__list">
              <li className="navbar__list--item">
                <Link aria-label="home" href={"/"}>
                  Home
                </Link>
              </li>
              <li
                className="navbar__list--item"
                onMouseEnter={() => setOpen({ ...open, first: true })}
                onMouseLeave={() => setOpen({ ...open, first: false })}
              >
                Services
                <i className="fa-solid fa-caret-down"></i>
                <Dropdown
                  array={[
                    { name: "All Services", link: "/my-services" },
                    { name: "Service Details", link: "/my-services/details" },
                  ]}
                  open={open.first}
                />
              </li>
              <li className="navbar__list--item">
                <a aria-label="about" href={"/#about"}>
                  About Me
                </a>
              </li>
              <li
                className="navbar__list--item"
                onMouseEnter={() => setOpen({ ...open, second: true })}
                onMouseLeave={() => setOpen({ ...open, second: false })}
              >
                <a aria-label="portfolio" href={"/#portfolio"}>
                  Portfolio
                  {/* <i className="fa-solid fa-caret-down"></i>
                  <Dropdown array={['All Portfolio', 'Portfolio Details']} open={open.second} /> */}
                </a>
              </li>
              <li
                className="navbar__list--item"
                onMouseEnter={() => setOpen({ ...open, third: true })}
                onMouseLeave={() => setOpen({ ...open, third: false })}
              >
                <a aria-label="blog" href={"/#blog"}>
                  Blog
                  {/* <i className="fa-solid fa-caret-down"></i>
                      <Dropdown array={['Blog Standard', 'All Blogs', 'Blog Details']} open={open.third} /> */}
                </a>
              </li>
            </ul>
            <div className="navbar__right">
              <ThemeSwitcher />
              <PrimaryBtn
                ariaLabel={"button-link"}
                text={"Contact Me"}
                link={"#footer"}
              />
            </div>
          </div>
          <button
            aria-label="menu"
            className="burger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {" "}
            {!menuOpen ? (
              <i className="fa-solid fa-bars"></i>
            ) : (
              <i className="fa-solid fa-xmark"></i>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
