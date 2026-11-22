import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "De Paul Public School Rajamudy — For God & Country",
  description:
    "De Paul Public School, Rajamudy, Idukki, Kerala. Committed to nurturing young minds with academic excellence, moral integrity, and social responsibility.",
  icons: {
    icon: "/assets/branding/logo.png",
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
        {children}
      </body>
    </html>
  );
}
