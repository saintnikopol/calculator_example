import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/Calculator.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Calculator",
  description: "A simple calculator built with React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
