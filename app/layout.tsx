import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Use system monospace as a fallback instead of downloading Geist Mono
// (avoids network font download failures during dev)

export const metadata: Metadata = {
  title: "Instagram Portfolio",
  description: "A showcase portfolio designed with the Instagram aesthetic. Built with Next.js and Tailwind CSS.",
  openGraph: {
    title: "Instagram Portfolio",
    description: "Check out this Instagram-themed portfolio showcase.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
