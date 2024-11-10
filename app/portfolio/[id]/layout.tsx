import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safarmurod's Portfolio | Project",
  description:
    "There are full informations about my project. You can find out what I can do for you.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
