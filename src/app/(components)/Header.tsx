"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">NXWS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:opacity-80 transition-opacity ${pathname === item.href ? "text-gray-900 font-medium" : "text-gray-600"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border hover:bg-gray-50"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="i-[hamburger] relative block w-5 h-[2px] bg-gray-900 before:content-[''] before:absolute before:-top-2 before:w-5 before:h-[2px] before:bg-gray-900 after:content-[''] after:absolute after:top-2 after:w-5 after:h-[2px] after:bg-gray-900" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`py-2 ${pathname === item.href ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


