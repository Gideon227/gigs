"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function useClearFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();

    return function clearFilter(setState: React.Dispatch<React.SetStateAction<string | null>>, key: string) {
        const params = new URLSearchParams(searchParams.toString());
        setState(null);
        params.delete(key);

        const queryString = params.toString()
        const newPath = queryString ? `/browse-jobs?${queryString}` : '/browse-jobs'
        params.set("country", "United States");
        router.replace(newPath, { scroll: false });

    };
}
