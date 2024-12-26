"use client";
// import { Header, Footer } from "./components";
import BackTop from "./components/ui/BackTop/BackTop";
import ModeContextProvider from "./context/ModeContext";

import "./fonts.scss";
import "./styles/app.scss";

import MouseFollower from "mouse-follower";
import gsap from "gsap";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
        <Provider store={store}>
          <body className="min-h-screen">
            <ModeContextProvider defaultTheme="light" enableSystem>
              {/* <Header /> */}
              {children}
              {/* <Footer /> */}
              <BackTop />
            </ModeContextProvider>
          </body>
        </Provider>
      </html>
    </>
  );
}
