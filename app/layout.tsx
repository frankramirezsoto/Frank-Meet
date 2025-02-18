import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frank Meet",
  description: "Frank Meet is an app to make a virtual meeting",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
        },
        elements:{
          headerTitle:"hidden"
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },
      }}>
      <body className={`${inter.className} bg-dark-2`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
