import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/providers/theme-provider";

import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IssueTracker Aswan Dashboard",
  description:
    "Dashboard to control IT Networks Issues and Solve It in Best Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem>
          <Navbar />
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
