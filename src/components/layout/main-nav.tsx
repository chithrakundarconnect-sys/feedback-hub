'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === link.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
