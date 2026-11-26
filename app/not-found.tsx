import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f2f6fb] px-4 py-10 text-[#0b1b3d]">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2">
        <figure className="relative m-0 min-h-48 md:min-h-[480px]">
          <Image src="/assets/campus.webp" alt="De Paul campus in Rajamudy" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1b3d] to-transparent px-5 pb-4 pt-12 text-sm font-semibold text-white">De Paul Public School &amp; Junior College, Rajamudy</figcaption>
        </figure>
        <div className="self-center p-6 sm:p-10">
          <Image src="/assets/branding/logo-navbar.png" alt="De Paul school crest" width={48} height={54} className="mb-6 object-contain" />
          <p className="mb-2 text-sm font-bold tracking-wide text-[#0256a1]">Error 404</p>
          <h1 className="text-4xl font-extrabold tracking-tight">Page not found</h1>
          <p className="mt-3 text-slate-700">This page may have moved. You can return to the homepage or use one of these school links.</p>
          <Link className="ed-section-cta mt-6" href="/"><ArrowLeft className="size-4" aria-hidden="true" /> Back to homepage</Link>
          <nav aria-label="School links" className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[#173e82]">
            {[["Admissions", "/admissions"], ["Documents", "/docs"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link prefetch={false} key={href} href={href} className="inline-flex items-center gap-1 underline underline-offset-4">
                {label}<ArrowUpRight className="size-3" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
