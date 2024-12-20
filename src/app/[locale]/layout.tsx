import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

import "@/styles/globals.css";

import Navbar from "@/components/layout/navbar";

import ThemeProvider from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker Aswan Dashboard",
  description:
    "Dashboard to control IT Networks Issues and Solve It in Best Solutions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backEndCookies = await cookies();
  const messages = await getMessages();
  const locale = await getLocale();
  // const access = backEndCookies.get(`${process.env.ACCESS_TOKEN_COOKIE}`);
  const refresh = backEndCookies.get(
    `${process.env.ACCESS_TOKEN_COOKIE}`
  )?.name;
  // console.log("layout: ", access);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" enableSystem>
          <Navbar cookie={refresh as string} />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
