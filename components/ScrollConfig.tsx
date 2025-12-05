"use client";

import { useEffect } from "react";

export default function ScrollConfig() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return null;
}
