"use client";

import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/");
  
  return (
    <div className="breadcrumb">
      <ul className="breadcrumb-list">
        {paths.map((path, index) => {
          if (path === "/dashboard") {
            return (
              <li key={index} className="breadcrumb-item">
                <a href="/" className="text-prime">dashboard</a>
              </li>
            );
          } else if (path !== "") {
            return (
              <li key={index} className="breadcrumb-item">
                <a href={`/${path}`}>{path}</a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
