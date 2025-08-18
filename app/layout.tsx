import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased`}>
        <div className="wrapper">{children}</div>
      </body>
    </html>
  );
}
