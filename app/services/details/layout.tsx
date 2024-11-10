import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safarmurod's Portfolio | Details",
  description:
    "There are full informations about my services. You can find out what I can do for you.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
