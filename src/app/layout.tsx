import type { Metadata } from "next";
import Link from 'next/link';
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css';
import Particles from "@/components/Particles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X-POCKET",
  description: "Pocket Universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Particles />
        <header className="relative pb-8 pt-8 flex flex-col items-center">
          <span className="relative inline-block">
            <Link href="/" className="text-3xl font-bold text-center block hover:opacity-80 transition">
              X-POCKET
            </Link>
          </span>
        </header>
        {children}
        <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-400">
          <div className="flex flex-col items-center gap-2">
            <span>{`© Copyright ${new Date().getFullYear()} X-POCKET `}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
