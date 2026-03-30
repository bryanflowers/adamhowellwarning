import { redirect } from "next/navigation";
import { Suspense } from "react";
import Layout from "@/components/Layout";

const supportedLangs = ["en", "th"];

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!supportedLangs.includes(lang)) {
    redirect("/en");
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
