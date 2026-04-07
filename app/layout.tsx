import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mash Bennett",
  description: "Mash Bennett — Party 101",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#E45F0B] text-[#F7EFE5]">
        {children}
      </body>
    </html>
  );
}