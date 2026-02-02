import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://academy.badgie.app";

export const metadata: Metadata = {
  title: {
    default: "Badgie Academy",
    template: "%s | Badgie Academy",
  },
  description:
    "Guía interactiva de onboarding para entrenadores. Aprende a usar la plataforma Badgie paso a paso.",
  keywords: [
    "Badgie",
    "entrenadores",
    "onboarding",
    "academia",
    "deportes",
    "guía",
    "tutorial",
  ],
  authors: [{ name: "Badgie Sports", url: "https://badgie.app" }],
  creator: "Badgie Sports",
  publisher: "Badgie Sports",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/badgielogo.png", type: "image/png" },
    ],
    apple: [{ url: "/badgielogo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Badgie Academy",
    title: "Badgie Academy - Guía para Entrenadores",
    description:
      "Guía interactiva de onboarding para entrenadores. Aprende a usar la plataforma Badgie paso a paso.",
    images: [
      {
        url: `${siteUrl}/badgielogo.png`,
        width: 1200,
        height: 630,
        alt: "Badgie Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badgie Academy - Guía para Entrenadores",
    description:
      "Guía interactiva de onboarding para entrenadores. Aprende a usar la plataforma Badgie paso a paso.",
    images: [`${siteUrl}/badgielogo.png`],
    creator: "@badgiesports",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Badgie Academy",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
