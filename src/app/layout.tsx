import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://stanby-management-report.vercel.app"
  ),

  title: {
    default: "Standby Management Report",
    template: "%s | Standby Management Report",
  },

  description:
    "Sistem Standby Management Report untuk pengelolaan data SU2ID dan KS secara cepat dan terstruktur.",

  keywords: [
    "Standby Management Report",
    "Standby Management",
    "SU2ID",
    "KS",
    "Part Code",
    "Part Number",
    "Quality Control",
    "Assembly",
    "Automotive",
  ],

  authors: [
    {
      name: "Standby Management Report",
    },
  ],

  creator: "Standby Management Report",

  applicationName:
    "Standby Management Report",

  generator: "Next.js",

  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },

      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],

    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",

    locale: "id_ID",

    url: "https://stanby-management-report.vercel.app",

    siteName:
      "Standby Management Report",

    title:
      "Standby Management Report",

    description:
      "Sistem Standby Management Report untuk pengelolaan data SU2ID dan KS secara cepat dan terstruktur.",

    images: [
      {
        url: "/og-image.png",

        width: 1200,

        height: 630,

        alt:
          "Standby Management Report",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Standby Management Report",

    description:
      "Sistem Standby Management Report untuk pengelolaan data SU2ID dan KS.",

    images: [
      "/og-image.png",
    ],
  },

  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  maximumScale: 1,

  themeColor: "#2563eb",

  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}