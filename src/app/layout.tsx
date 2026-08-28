import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Blujoy | GovCon, SAP & UI/UX Services for Government and Enterprise",
    template: "%s | Blujoy",
  },
  description:
    "We help businesses win government contracts, modernize SAP systems, and design digital experiences that convert. Schedule a free consultation today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">{children}</body>
    </html>
  );
}
