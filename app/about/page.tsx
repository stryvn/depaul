import { AboutInteractivePage } from "@/components/about-page/AboutInteractivePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — De Paul Public School Rajamudy",
  description:
    "Discover the history, values, leadership, faculty, and world-class campus facilities of De Paul Public School & Junior College, Rajamudy. CBSE Affiliated No. 930624.",
};

export default function AboutPage() {
  return <AboutInteractivePage />;
}
