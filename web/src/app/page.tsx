import { redirect } from "next/navigation";

const defaultLocale = "it";

export default function Home() {
  redirect(`/${defaultLocale}`);
}