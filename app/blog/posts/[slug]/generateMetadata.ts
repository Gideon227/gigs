import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;

  const url = `https://uximjvcbkz.blogbowl.app/blog/posts/${slug}`;
  const res = await fetch(url, { 
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });

  if (!res.ok) return notFound();

  const html = await res.text();

  const getMeta = (property: string) => {
    const regex = new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
    const match = html.match(regex);
    return match?.[1] ?? null;
  };

  // Extract OG metadata
  const ogTitle = getMeta("og:title");
  const ogDesc = getMeta("og:description");
  const ogImage = getMeta("og:image");
  const ogUrl = `https://gigs.tech/blog/posts/${slug}`;

  return {
    title: ogTitle ?? "Blog Post | GIGS.TECH",
    description: ogDesc ?? "",
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      title: ogTitle ?? "",
      description: ogDesc ?? "",
      url: ogUrl,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : [],
      siteName: "GIGS.TECH",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? "",
      description: ogDesc ?? "",
      images: ogImage ? [ogImage] : [],
    },
  };
}
