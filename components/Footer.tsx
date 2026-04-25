import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Pools", href: "/pool" },
  { label: "Swap", href: "/pool" },
  { label: "Docs", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-violet-900/20 bg-[#060609] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/Stabble_X_Stellar_logo.jpg"
              alt="Built on Stellar"
              width={110}
              height={40}
              className="h-9 w-auto rounded-xl opacity-75 hover:opacity-100 transition-opacity"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-6 justify-center">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-300 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-gray-700 text-xs">
            © 2025 Stabble × Stellar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
