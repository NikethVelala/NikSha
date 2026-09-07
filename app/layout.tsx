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

const socialPreview = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Niketh & Sirisha — NikSha wedding invitation",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nik-sha.vercel.app"),
  title: "NikSha | Niketh & Sirisha",
  description: "Together with our families, we invite you to celebrate the wedding of Niketh & Sirisha on 18 November 2026 in Visakhapatnam.",
  openGraph: {
    type: "website",
    title: "Niketh & Sirisha | NikSha",
    description: "Together with our families, we invite you to celebrate our wedding on 18 November 2026 in Visakhapatnam.",
    url: "https://nik-sha.vercel.app",
    siteName: "NikSha",
    images: [socialPreview],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niketh & Sirisha | NikSha",
    description: "Together with our families, we invite you to celebrate our wedding on 18 November 2026 in Visakhapatnam.",
    images: [socialPreview.url],
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
