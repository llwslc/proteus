import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kit Theme Lab — 15 Candidate Directions",
  description:
    "An interactive visual laboratory for fifteen expressive interface themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
