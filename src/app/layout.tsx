import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Invoice Generator",
  description: "Generate professional invoices easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased" suppressHydrationWarning={true}>
        <StoreProvider>
          <AuthProvider>
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </AuthProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}