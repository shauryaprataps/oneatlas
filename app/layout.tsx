import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { HomeButton }
from "@/components/global/home-button"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneAtlas",
  description: "Runtime platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>

        {children}

        <HomeButton />

      </body>
    </html>
  );
}