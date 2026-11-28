import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import { SiteMotion } from "@/components/motion/SiteMotion";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B1B3D" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1B3D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://depaulidukki.com"),
  title: {
    default: "De Paul Public School Rajamudy — For God & Country",
    template: "%s | De Paul Public School Rajamudy",
  },
  description:
    "De Paul Public School & Junior College, Rajamudy, Idukki, Kerala. Affiliated to CBSE (No. 930624). Committed to holistic education, academic excellence, and moral integrity.",
  keywords: [
    "De Paul Public School",
    "De Paul Rajamudy",
    "Schools in Idukki",
    "CBSE Schools Kerala",
    "Junior College Rajamudy",
    "Vincentian School Idukki",
  ],
  icons: {
    icon: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "De Paul Public School Rajamudy — For God & Country",
    description:
      "De Paul Public School & Junior College, Rajamudy, Idukki, Kerala. Committed to holistic education, academic excellence, and moral integrity.",
    url: "https://depaulidukki.com",
    siteName: "De Paul Public School & Junior College",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/campus_exterior/drone-shot-final-frame.webp",
        width: 1280,
        height: 720,
        alt: "Aerial view of De Paul Public School in Rajamudy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "De Paul Public School Rajamudy",
    description:
      "De Paul Public School & Junior College, Rajamudy, Idukki, Kerala. For God & Country.",
    images: ["/assets/campus_exterior/drone-shot-final-frame.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-surface-offwhite font-sans text-surface-dark selection:bg-brand-royal selection:text-white">
        <Suspense fallback={null}><SiteMotion /></Suspense>
        {children}
      </body>
    </html>
  );
}
