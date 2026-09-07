import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nik-sha.vercel.app"),
  title: "NikSha | Niketh & Sirisha",
  description: "The wedding invitation of Niketh & Sirisha — 18 November 2026, Visakhapatnam.",
  openGraph: {
    type: "website",
    title: "NikSha | Niketh & Sirisha",
    description: "The wedding invitation of Niketh & Sirisha — 18 November 2026, Visakhapatnam.",
    url: "https://nik-sha.vercel.app",
    siteName: "NikSha",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Niketh & Sirisha — NikSha wedding invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NikSha | Niketh & Sirisha",
    description: "The wedding invitation of Niketh & Sirisha — 18 November 2026, Visakhapatnam.",
    images: ["/images/hero.jpg"],
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
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-stone-900">
        {children}
      </body>
    </html>
  );
}
