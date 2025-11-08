import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/browse-jobs?country=United+States&page=1&limit=10')
}
