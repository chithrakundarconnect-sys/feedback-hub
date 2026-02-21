'use client';

import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { SITE_NAME } from '@/lib/constants';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{SITE_NAME}</title>
        <meta name="description" content="A powerful system for managing customer feedback." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <ThemeProvider
          storageKey="ui-theme"
        >
          {isAdminPage ? (
            <>{children}</>
          ) : (
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
