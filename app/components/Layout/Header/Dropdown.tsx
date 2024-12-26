"use client";
import Link from "next/link";

const Dropdown = ({ array, open }: DropdownProps) => {
  return (
    <ul className={`dropdown ${open && "open"} transition duration-300`}>
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
