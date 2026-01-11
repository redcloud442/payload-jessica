import React, { ReactNode } from "react";
import "@/styles/global.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

type LayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: {
    default: "Jessica Lleona | Video Editor",
    template: "%s | Jessica Lleona",
  },
  description:
    "Jessica Lleona is a professional video editor specializing in cinematic edits, short-form content, and brand storytelling. Let's bring your vision to life.",

  keywords: [
    "Jessica Lleona",
    "Video Editor",
    "Cinematic Video Editing",
    "Short Form Video Editor",
    "Reels Editor",
    "YouTube Video Editor",
    "Brand Video Editing",
    "Freelance Video Editor",
  ],

  authors: [{ name: "Jessica Lleona" }],
  creator: "Jessica Lleona",
  publisher: "Jessica Lleona",

  metadataBase: new URL("https://jessicalleonablog.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Jessica Lleona | Video Editor",
    description:
      "Professional video editor creating cinematic visuals, engaging short-form content, and impactful brand stories.",
    url: "https://jessicalleonablog.com",
    siteName: "Jesica Lleona",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jessica Lleona – Video Editor",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jessica Lleona | Video Editor",
    description:
      "Cinematic video editor crafting engaging visuals for brands, creators, and storytellers.",
    creator: "@jesica_lleona",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={cn("bg-background antialiased", fontSans.variable)}
    >
      <body className="min-h-screen bg-background antialiased">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
