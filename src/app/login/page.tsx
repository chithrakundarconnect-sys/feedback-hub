import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center mb-4">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Admin Portal</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  suppressHydrationWarning
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  suppressHydrationWarning
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                suppressHydrationWarning
              >
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
