"use client";

import { TypographyProps } from "@/app/types/types";

const Typography = ({
  children,
  maxWidth,
  color,
  fontWeight,
  fontSize,
}: TypographyProps) => {
  return (
    <p
      className={"typography"}
      style={{ maxWidth, color, fontWeight, fontSize }}
    >
      {children}
    </p>
  );
};

export default Typography;
