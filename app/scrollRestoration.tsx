'use client'

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedY = sessionStorage.getItem(`scroll-${pathname}`);

    if (savedY) {
      window.scrollTo(0, Number(savedY));
    }

    return () => {
      sessionStorage.setItem(`scroll-${pathname}`, String(window.scrollY));
    };
  }, [pathname]);

  return null;
}
