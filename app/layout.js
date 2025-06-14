import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter=Inter({subsets:["latin"]});

export const metadata = {
  title: "SpendSense",
  description: "Know Where Your Money Goes, Effortlessly",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <Header/>
        <main className="min-h-screen pt-24">{children}</main>
        <Toaster richColors />
        <footer className="w-full bg-blue-50 py-12">
            <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 text-center text-gray-600">
              <p>Made with 💗 by Pardha Saradhi</p>
            </div>
          </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
