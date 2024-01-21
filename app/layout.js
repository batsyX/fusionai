import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
import {dark} from "@clerk/themes";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FusionAI",
  description: "Generate with AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={dark}>

    <html lang="en">
      <body className={inter.className}>
      
       {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
