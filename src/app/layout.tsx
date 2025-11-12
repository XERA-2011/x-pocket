import type { Metadata } from "next/types";
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css';
import Background from "@/components/background/star";
// import Footer from "@/components/footer";
import Header from "@/components/header";
import SmoothScroll from "@/components/SmoothScroll";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Preloader from "@/components/preloader";
import { AppProvider } from "@/contexts/AppContext";

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
    <html lang="en" className="theme-selection" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-scrollbar`}
      >
        <AppProvider>
          <Preloader>
            <SmoothScroll>
              <Background />
              <Header />
              {children}
              {/* <Footer /> */}
              <ElasticCursor />
            </SmoothScroll>
          </Preloader>
        </AppProvider>
      </body>
    </html>
  );
}
