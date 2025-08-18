import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "../components/profileContext/profile-content";

export const metadata: Metadata = {
  title: "Esycles Vendor",
  description: "Esycles Vendor",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={`antialiased`}>{children}</body>
      </UserProvider>
    </html>
  );
}
