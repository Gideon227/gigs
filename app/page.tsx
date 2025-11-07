// import Image from "next/image";
// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect('/browse-jobs?country=United+States&page=1&limit=10')
// }


// /app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/browse-jobs?country=United+States&page=1&limit=10');
  }, [router]);

  return null; // or a loading spinner
}
