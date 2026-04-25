import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stabble × Stellar — Global Liquidity. Institutional Grade.",
  description:
    "The most capital-efficient stablecoin AMM protocol, now integrated with Stellar's global payment network. Near-zero fees, 5-second finality.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#08080f] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
