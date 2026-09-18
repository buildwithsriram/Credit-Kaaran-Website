import type { Metadata } from "next";
import "./globals.css";
import "./refinements.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "Credit Kaaran — Cards. Clarity. Confidence.", template: "%s | Credit Kaaran" },
  description: "Your credit card guide in Tamil and Tanglish. Explore cards, find personal guidance, and make more of your rewards.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className="antialiased"><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
