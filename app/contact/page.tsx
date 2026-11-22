import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact-page/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — De Paul Public School Rajamudy",
  description:
    "Contact the school office or find directions to the campus of De Paul Public School & Junior College in Rajamudy, Idukki, Kerala. CBSE Affiliation No. 930624.",
  alternates: {
    canonical: "https://depaulidukki.com/contact",
  },
  openGraph: {
    title: "Contact De Paul Public School Rajamudy",
    description:
      "Speak with the school office or get directions to our campus in Rajamudy, Idukki. CBSE Affiliation No. 930624.",
    url: "https://depaulidukki.com/contact",
    siteName: "De Paul Public School & Junior College",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/about-campus.webp",
        width: 1280,
        height: 720,
        alt: "De Paul Public School campus in Rajamudy, Idukki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact De Paul Public School Rajamudy",
    description:
      "Speak with the school office or get directions to our campus in Rajamudy, Idukki.",
    images: ["/assets/about-campus.webp"],
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
        "De Paul Public School & Junior College is a CBSE Senior Secondary institution in Rajamudy, Idukki, Kerala, managed by the Vincentian Fathers. Affiliation No. 930624.",
      telephone: ["+91 96056 02400", "+91 95447 29133"],
      email: "depaulrajamudy@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Upputhode Road, Rajamudy P.O.",
        addressLocality: "Rajamudy",
        addressRegion: "Kerala",
        postalCode: "685604",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ContactPage",
      "@id": "https://depaulidukki.com/contact/#webpage",
      url: "https://depaulidukki.com/contact",
      name: "Contact De Paul Public School Rajamudy",
      description:
        "Contact the school office or find directions to the campus of De Paul Public School & Junior College in Rajamudy, Idukki.",
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
          name: "Contact",
          item: "https://depaulidukki.com/contact",
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
