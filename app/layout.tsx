"use client"
// import { Header, Footer } from "./components";
import BackTop from "./components/BackTop/BackTop";
import ModeContextProvider from "./context/ModeContext";

import "./fonts.scss";
import "./styles/app.scss";

import MouseFollower from "mouse-follower";
import gsap from "gsap";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    MouseFollower.registerGSAP(gsap);
    const cursor = new MouseFollower();
    return () => {
      cursor.destroy();
    };
  }, []);
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen">
          <ModeContextProvider defaultTheme="light" enableSystem>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
            <BackTop />
          </ModeContextProvider>
        </body>
      </html>
    </>
  );
}
