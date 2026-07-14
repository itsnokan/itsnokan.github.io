import type { Metadata } from "next";
import { Cinzel_Decorative, Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";

const display = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display"
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itsnokan.github.io"),
  title: "Antonio & Jucivania | Casamento",
  description: "Convite digital, confirmação de presença, localização e lista de presentes do casamento de Antonio e Jucivania.",
  openGraph: {
    title: "Antonio & Jucivania | 21.08.2026",
    description: "Com carinho, convidamos para celebrar este dia especial.",
    images: ["/foto-casal.jpeg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${display.variable} ${serif.variable} ${sans.variable}`}>
        {children}
      </body>
    </html>
  );
}
