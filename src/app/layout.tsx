import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RealEstate Pro - Find Your Dream Home",
  description: "Discover the perfect property for rent or purchase. Browse through thousands of verified listings with advanced search filters, interactive maps, and detailed property information.",
  keywords: "real estate, property, rent, buy, house, apartment, commercial, residential",
  authors: [{ name: "RealEstate Pro Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
        </div>
      </body>
    </html>
  );
}