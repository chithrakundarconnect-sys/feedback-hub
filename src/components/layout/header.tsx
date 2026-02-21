import { SITE_NAME } from '@/lib/constants';
import { MainNav } from './main-nav';
import { ThemeToggle } from '../theme/theme-toggle';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">{SITE_NAME}</span>
          </Link>
        </div>
        <div className="flex-1 md:hidden">
           <Link href="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
          </Link>
        </div>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button asChild variant="ghost">
            <Link href="/login">Admin Login</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
