"use client"
import { useSearchParams, useRouter } from "next/navigation";

export default function useMultiSearchParams(){
    const searchParams = useSearchParams();
    const router = useRouter();

    const params = new URLSearchParams(searchParams)
    
    const updateMultiSearchParam = (key: string, value: string ) => {
        const values = new Set(searchParams.getAll(key));

        if (values.has(value)) {
        values.delete(value);
        } else {
        values.add(value);
        }

        params.delete(key);
        for (const v of values) {
        params.append(key, v);
        }
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
    };

    const updateSingleParam = (key: string, value: string | null) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        router.replace(`/browse-jobs?${params.toString()}`, { scroll: false });
      };
}
