import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebCodeLancer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-[hsl(240,_10%,_3.9%)] h-screen w-screen overflow-x-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
