"use client";

import React from "react";
import Link from "next/link";
import { SecondaryBtnProps } from "@/app/types/types";

const SecondaryBtn = ({ link, text }: SecondaryBtnProps) => {
  return (
    <Link aria-label="page-link" href={link} className="secondary-btn">
      {text}
    </Link>
  );
};

export default SecondaryBtn;
