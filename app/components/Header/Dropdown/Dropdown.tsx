"use client";
import { DropdownProps } from "@/app/types/types";
import Link from "next/link";

const Dropdown = ({ array, open }: DropdownProps) => {
  return (
    <ul className={`dropdown ${open && "open"}`}>
      {array.map((el, index) => (
        <li className="dropdown-item" key={index}>
          <Link href={el.link} aria-label="page-link">
            {el.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
