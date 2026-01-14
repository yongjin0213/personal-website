import type { Metadata } from "next";
import { Fraunces, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import CmsShell from "./components/cms/CmsShell";
import { CmsProvider } from "./components/cms/cms-context";
import EditableText from "./components/cms/EditableText";
import NavBar from "./components/NavBar";
import siteData from "./data/site.json";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yongjin Lee",
  description: "Personal website for Yongjin Lee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${geistMono.variable} antialiased`}
      >
        <CmsProvider>
          <CmsShell>
            <div className="relative min-h-screen overflow-hidden bg-[var(--green-bg)] text-[var(--green-text)]">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,201,111,0.35),rgba(123,201,111,0))]" />
              <div className="pointer-events-none absolute bottom-0 right-[-80px] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(47,111,62,0.2),rgba(47,111,62,0))]" />
              <NavBar siteName={siteData.site.name} />
              <main className="relative z-10 mx-auto w-full max-w-5xl px-6 py-12">
                {children}
              </main>
              <footer className="relative z-10 border-t border-[var(--green-muted)] px-6 py-8 text-sm text-[color:rgba(31,45,31,0.7)]">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <EditableText
                    path="site.tagline"
                    defaultValue={siteData.site.tagline}
                    as="span"
                    className="font-display text-base text-[var(--green-text)]"
                    singleLine
                  />
                  <EditableText
                    path="site.focus"
                    defaultValue={siteData.site.focus}
                    as="span"
                  />
                </div>
              </footer>
            </div>
          </CmsShell>
        </CmsProvider>
      </body>
    </html>
  );
}
