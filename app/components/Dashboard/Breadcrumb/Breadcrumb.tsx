"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

const Breadcrumb = ({ title = "", backlink = "" }: BreadcrumbProps) => {
  const pathname = usePathname();

  const paths = pathname.split("/").filter((path) => path !== "");
  const transformedPaths = paths.map((path, index) => {
    return paths.slice(0, index + 1).join("/");
  });
  return (
    <div>
      <div className="breadcrumb">
        <ul className="breadcrumb-list">
          {transformedPaths.map((path, index) => {
            return (
              <li key={index} className="breadcrumb-item">
                <Link href={`/${path}`} className="text-prime">
                  {paths[index]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <div className="dashboard-title mb-[20px]">{title}</div>
        {backlink && (
          <Link className="breadcrumb-btn" href={backlink}>
            <IoArrowBackOutline /> <span>Back</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
