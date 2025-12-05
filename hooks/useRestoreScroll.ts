"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const useRestoreScroll = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = "browse_scroll_" + searchParams.toString();
    const saved = sessionStorage.getItem(key);

    if (saved) {
      // Restore scroll after next tick to ensure content rendered
      setTimeout(() => {
        window.scrollTo({ top: parseInt(saved, 10), behavior: "auto" });
      }, 0);

      sessionStorage.removeItem(key);
    }
  }, [searchParams]);
};
