"use client";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary"> 庭リフォームナビ</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/ranking/" className="text-gray-700 hover:text-primary transition-colors">ランキング</Link>
          <Link href="/work/wood-deck/" className="text-gray-700 hover:text-primary transition-colors">工事の種類</Link>
          <Link href="/cost/total/" className="text-gray-700 hover:text-primary transition-colors">費用相場</Link>
          <Link href="/scene/new-house/" className="text-gray-700 hover:text-primary transition-colors">シーン別</Link>
          <Link
            href="/ranking/estimate/"
            className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <span className="text-xs bg-white text-accent px-1.5 py-0.5 rounded font-bold">PR</span>
            無料見積もり
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/ranking/" className="text-gray-700" onClick={() => setMenuOpen(false)}>ランキング</Link>
          <Link href="/work/wood-deck/" className="text-gray-700" onClick={() => setMenuOpen(false)}>工事の種類</Link>
          <Link href="/cost/total/" className="text-gray-700" onClick={() => setMenuOpen(false)}>費用相場</Link>
          <Link href="/scene/new-house/" className="text-gray-700" onClick={() => setMenuOpen(false)}>シーン別</Link>
          <Link
            href="/ranking/estimate/"
            className="bg-accent text-white px-4 py-2 rounded-full text-center font-bold"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-xs bg-white text-accent px-1.5 py-0.5 rounded font-bold mr-1">PR</span>
            無料見積もり
          </Link>
        </div>
      )}
    </header>
  );
}
