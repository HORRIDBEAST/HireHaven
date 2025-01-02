import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  ContextProvider  from "@/provider/contextProvide";

import { Ysabeau_SC } from 'next/font/google';
import { Toaster } from "react-hot-toast";

// Configure the font
export const ysabeau = Ysabeau_SC({
  subsets: ['latin'],
  weight: ['100', '200', '400', '700', '1000'], // Add the weights you need
  display: 'swap', // Optional: Controls the `font-display` property
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={`${ysabeau.className} antialiased`}>
          <Toaster position="top-center"/>
       <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
