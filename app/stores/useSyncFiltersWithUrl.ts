"use client";

import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useJobFilters } from "./useJobFilters";

export default function useSyncFiltersWithUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initFromSearchParams = useJobFilters((s) => s.initFromSearchParams);
  const toSearchParamsString = useJobFilters((s) => s.toSearchParamsString);

  // on mount / whenever the URL (searchParams) changes externally,
  // populate the store from URL. If the store put a default country,
  // we will write the URL below.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const defaultApplied = initFromSearchParams(params);

    if (defaultApplied) {
      // store applied default "United States" -> push it once to URL
      const qs = useJobFilters.getState().toSearchParamsString();
      router.replace(`/browse-jobs?${qs}`, { scroll: false });
    }
    // we intentionally depend on searchParams.toString() only
  }, [searchParams.toString(), initFromSearchParams, router]);

  // When the store changes, push changes into the URL (debounced).
  const debouncedReplace = useMemo(
    () =>
      debounce((qs: string) => {
        router.replace(`/browse-jobs?${qs}`, { scroll: false });
      }, 200),
    [router]
  );

  // derive querystring from store (selector) so effect runs only when string changes
  const storeQs = useJobFilters((s) => s.toSearchParamsString());

  useEffect(() => {
    const current = searchParams.toString();
    if (storeQs !== current) {
      debouncedReplace(storeQs);
    }
    return () => {
      // cleanup wont cancel the last scheduled call (optional)
    };
  }, [storeQs, searchParams.toString(), debouncedReplace]);
}
