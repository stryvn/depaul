import { AdmissionEnquiryForm } from "./AdmissionEnquiryForm";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Find out how to enquire about admission to De Paul Public School & Junior College in Rajamudy, Idukki.",
  alternates: { canonical: "/admissions" },
  openGraph: { title: "Admissions | De Paul Public School Rajamudy", url: "/admissions" },
};

const steps = [
  ["Check availability", "Tell the school office which class and academic year you are interested in. The office can confirm availability and any relevant dates."],
  ["Ask for the application form", "The school office can explain how to apply and which documents are required for the class."],
  ["Follow up with the school office", "Confirm how to submit the application and ask about next steps or arranging a campus visit."],
];

export default function AdmissionsPage() {
  return (
    <>
      <TopNavbar isMerged />
      <main className="w-[var(--public-content-width)] mx-auto pb-16 pt-[104px]">
        <section className="grid overflow-hidden rounded-2xl bg-[#0b1b3d] text-white md:grid-cols-2" aria-labelledby="admissions-title">
          <div className="grid content-center justify-items-center gap-4 p-7 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#a9c6ed]">Rajamudy, Idukki</p>
            <h1 id="admissions-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">Admissions</h1>
            <p className="max-w-sm text-[#e0eafa]">Kindergarten to Senior Secondary at De Paul Public School &amp; Junior College.</p>
            <a className="mt-2 inline-flex min-h-11 items-center rounded-lg bg-white px-5 text-sm font-bold text-[#173e82]" href="#enquiries">Enquire about admission</a>
          </div>
          <div className="relative min-h-56 sm:min-h-72">
            <Image src="/assets/campus.webp" alt="De Paul Public School campus in Rajamudy" fill sizes="(max-width: 767px) 100vw, 50vw" fetchPriority="high" className="object-cover" />
          </div>
        </section>
        <section className="my-12" aria-labelledby="how-to-apply">
          <h2 id="how-to-apply" className="mb-5 text-2xl font-bold text-[#0b1b3d] sm:text-3xl">How to apply</h2>
          <ol className="grid list-decimal gap-4 sm:grid-cols-3">
            {steps.map(([title, detail]) => (
              <li key={title} className="list-inside rounded-xl border border-[#d7e0ec] bg-white p-5 marker:font-bold marker:text-[#173e82]">
                <h3 className="inline font-bold text-[#0b1b3d]">{title}</h3>
                <p className="mt-2 text-slate-700">{detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="rounded-xl border border-[#d7e0ec] bg-white p-6" aria-labelledby="enquiries">
          <h2 id="enquiries" className="scroll-mt-24 text-xl font-bold text-[#0b1b3d]">Admissions enquiries</h2>
          <p className="mb-5 mt-2 text-sm text-slate-700">Ask about a place or request application details. Submitting an enquiry does not confirm admission.</p>
          <AdmissionEnquiryForm />
          <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-200 pt-4 text-sm font-semibold text-[#173e82]">
            <a className="underline underline-offset-4" href="tel:+919605602400">+91 96056 02400</a>
            <a className="break-all underline underline-offset-4" href="mailto:depaulrajamudy@gmail.com?subject=Admissions%20enquiry">Email the school office</a>
            <Link prefetch={false} className="underline underline-offset-4" href="/contact/">Contact and directions</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
