import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Olivier Thorel — Full-stack developer",
  description:
    "Full-stack developer building complete web applications, from backend architecture and business logic to the interface. Explore Flexitaf, Syntra and SerieMatch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.classList.toggle('dark',localStorage.getItem('theme')!=='light')}catch{}` }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
