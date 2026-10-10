import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexusCareers — Premium Tech Job Board & Interview Preparation",
  description:
    "Discover high-impact engineering roles, run real-time AI mock interviews, optimize your resume for ATS algorithms, and negotiate top-tier compensation.",
  keywords: [
    "job portal",
    "software engineering jobs",
    "interview preparation",
    "mock interview simulator",
    "ATS resume scanner",
    "frontend architect",
    "system design prep",
    "salary negotiation"
  ],
  authors: [{ name: "NexusCareers" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080c14] text-slate-100 bg-ambient-mesh">
        {children}
      </body>
    </html>
  );
}
