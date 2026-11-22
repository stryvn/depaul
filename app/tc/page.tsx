import type { Metadata } from "next";
import { TcPortalClient } from "@/components/tc/TcPortalClient";

export const metadata: Metadata = {
  title: "Transfer Certificate (TC) Verification — De Paul Public School Rajamudy",
  description:
    "Official Transfer Certificate verification portal for De Paul Public School & Junior College, Rajamudy, Idukki. CBSE Affiliation No. 930624. Verify student withdrawal records and transfer certificates online.",
  alternates: {
    canonical: "https://depaulidukki.com/tc",
  },
  openGraph: {
    title: "Transfer Certificate Verification | De Paul Public School, Rajamudy, Idukki",
    description:
      "Use the official De Paul Public School & Junior College transfer certificate verification portal for Rajamudy, Idukki. CBSE Affiliation No. 930624.",
    url: "https://depaulidukki.com/tc",
    siteName: "De Paul Public School & Junior College",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transfer Certificate Verification | De Paul Public School, Rajamudy",
    description:
      "Verify student Transfer Certificates online. De Paul Public School & Junior College, Rajamudy, Idukki.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "School",
      "@id": "https://depaulidukki.com/#school",
      name: "De Paul Public School & Junior College",
      url: "https://depaulidukki.com/",
      logo: "https://depaulidukki.com/assets/branding/logo.png",
      description:
        "De Paul Public School & Junior College is a CBSE school in Rajamudy, Idukki, Kerala, managed by the Vincentian Fathers. Explore admissions and school life.",
      telephone: ["+91 96056 02400", "+91 95447 29133"],
      email: "depaulrajamudy@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Upputhode Road, Rajamudy",
        addressLocality: "Idukki",
        addressRegion: "Kerala",
        postalCode: "685604",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://depaulidukki.com/#website",
      url: "https://depaulidukki.com/",
      name: "De Paul Public School & Junior College",
      publisher: {
        "@id": "https://depaulidukki.com/#school",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://depaulidukki.com/tc/#webpage",
      url: "https://depaulidukki.com/tc",
      name: "Transfer Certificate Verification | De Paul Public School, Rajamudy",
      description:
        "Use the official De Paul Public School & Junior College transfer certificate verification portal for Rajamudy, Idukki.",
      isPartOf: {
        "@id": "https://depaulidukki.com/#website",
      },
      about: {
        "@id": "https://depaulidukki.com/#school",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://depaulidukki.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Transfer Certificate",
          item: "https://depaulidukki.com/tc",
        },
      ],
    },
  ],
};

export default function TcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TcPortalClient />
    </>
  );
}
