import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;

  const url = `https://uximjvcbkz.blogbowl.app/posts/${slug}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return notFound();

  const html = await res.text();

  const getMeta = (property: string) => {
    const regex = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
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
