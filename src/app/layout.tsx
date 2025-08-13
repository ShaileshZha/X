import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import Header from "@/app/(components)/Header";
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
  title: "NXWS News & Blog",
  description: "Modern blog with live news and optimized AdSense placements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsbygoogle-init"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9965673213249465"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6 min-h-[70vh]">
          {children}
        </main>
        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 flex items-center justify-between">
            <p>© {new Date().getFullYear()} NXWS. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <Link href="/news" className="hover:text-gray-700">News</Link>
              <Link href="/blog" className="hover:text-gray-700">Blog</Link>
              <Link href="/contact" className="hover:text-gray-700">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
