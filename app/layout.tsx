import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little Birthday Magic",
  description: "A tiny, interactive birthday experience made with love.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}