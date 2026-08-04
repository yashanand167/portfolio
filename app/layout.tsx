import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";

import { ThemeProvider } from "@/context/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Yash Anand",
    template: "%s | Yash Anand",
  },
  description:
    "Design engineer building rich and sleek web applications with modern technologies and minimalistic design.",
  icons: {
    icon: "/FavIcon.png",
    shortcut: "/FavIcon.png",
    apple: "/FavIcon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Script id="color-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("color-theme");if(t&&t!=="default")document.documentElement.dataset.theme=t}catch(e){}})();`}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
