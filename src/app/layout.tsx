import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css';
import Star from "@/components/background/star";
import Footer from "@/components/footer";
import Header from "@/components/header";

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
    <html lang="en" className="theme-selection">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-scrollbar`}
        style={{
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-white)',
          fontFamily: 'var(--font-sans), Arial, Helvetica, sans-serif'
        }}
      >
        <Star />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
