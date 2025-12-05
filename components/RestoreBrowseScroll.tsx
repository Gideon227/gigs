"use client";

import { useEffect } from "react";

export default function RestoreBrowseScroll() {
  useEffect(() => {
    const saved = sessionStorage.getItem("browse_scroll");

    if (saved) {
      // Restore scroll position
      window.scrollTo({
        top: parseInt(saved, 10),
        behavior: "instant",
      });

      // Clear so it doesn't re-run on page refresh
      sessionStorage.removeItem("browse_scroll");
    }
  }, []);

  return null;
}
