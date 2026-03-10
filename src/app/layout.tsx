import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import ExchangeIndicesBar from "@/components/exchange-indices-bar";

// function ThemeScript() {
//   const script = `(() => {
//   try {
//     const stored = localStorage.getItem('fe-theme');
//     const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//     const theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
//     const root = document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
//   } catch {}
// })();`;

//   return <script dangerouslySetInnerHTML={{ __html: script }} />;
// }

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FinancialEDGE",
    template: "%s | FinancialEDGE",
  },
  description: "Nigeria's most reliable financial market analysis for the savvy investor.",
  icons: {
    icon: "/globe.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <ThemeScript /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased pt-[200px]`}
      >
        <ExchangeIndicesBar />
        <SiteHeader
          items={[
            { label: "Home", href: "/" },
            { label: "Capital Market", href: "/category/capital-market" },
            { label: "Money Market", href: "/category/money-market" },
            { label: "Energy", href: "/category/energy" },
            { label: "News", href: "/category/news" },
            { label: "Industry", href: "/category/industry" },
          ]}
        />
        <section className="relative mt-[14px] sm:mt-[23px]">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">{children}</div>
        </section>
        <SiteFooter />
      </body>
    </html>
  );
}
