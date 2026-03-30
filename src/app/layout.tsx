import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gab | Product Developer",
  description: "Product Developer building software that solves real problems, scales cleanly, and delivers value.",
  metadataBase: new URL("https://komakahol.online"),
  openGraph: {
    title: "Gab — Product Developer",
    description: "Building software that solves real problems, scales cleanly, and delivers value.",
    url: "https://komakahol.online",
    siteName: "Gab Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gab — Product Developer",
    description: "Building software that solves real problems, scales cleanly, and delivers value.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${bebasNeue.variable} antialiased overflow-x-hidden`}>
      <body>{children}</body>
    </html>
  );
}
