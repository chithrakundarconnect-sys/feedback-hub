"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, Menu, X } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">

      <div className="container flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          <span className="font-bold hidden sm:block">{SITE_NAME}</span>
        </Link>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/feedback">Feedback</Link>

          <Button asChild variant="ghost">
            <Link href="/login">Admin Login</Link>
          </Button>

          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/feedback" onClick={() => setOpen(false)}>Feedback</Link>
            <Link href="/login" onClick={() => setOpen(false)}>Admin Login</Link>
            <ThemeToggle />
          </div>
        </div>
      )}

    </header>
  );
}