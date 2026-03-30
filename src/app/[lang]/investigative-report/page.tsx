import { redirect } from "next/navigation";

export default async function InvestigativeReportRedirect({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond`);
}
