import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { NavBar } from "../components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import favicon from "@/public/logo.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebCodeLancer",
};

export default function RootLayout({
  children, ...pageProps
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} color="#fff"/>
      </head>
      <body className={`${inter.className} dark:bg-[hsl(240,_10%,_3.9%)] h-full w-screen overflow-x-hidden`}>
        <Providers>
          <NavBar />
          {children}

        </Providers>
      </body>
    </html>
  );
}
