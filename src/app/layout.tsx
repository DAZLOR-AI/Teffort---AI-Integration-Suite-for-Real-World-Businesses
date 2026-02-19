import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teffort-AI Integration Suite",
  description: "Discover, prototype, and deploy AI automations for real-world businesses."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
