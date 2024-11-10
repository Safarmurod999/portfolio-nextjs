"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ModeContextProviderProps extends ThemeProviderProps {
  children: ReactNode;
}

const ModeContextProvider = ({
  children,
  ...props
}: ModeContextProviderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Prevents SSR mismatch
  }

  return (
    <ThemeProvider {...props}>
      {children}
    </ThemeProvider>
  );
};

export default ModeContextProvider;
