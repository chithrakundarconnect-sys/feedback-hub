'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { db, auth } from '@/lib/firebase';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LogOut,
  Settings,
  LayoutDashboard,
  Image as ImageIcon,
  Inbox,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

/* 🔐 ADMIN EMAIL (IMPORTANT) */
const ADMIN_EMAIL = 'admin@gmail.com'; // replace with your admin email

type Feedback = {
  id: string;
  feedback: string;
  createdAt: any;
  imageBase64?: string | null;
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

 /* 🔐 Stable Admin Protection */
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {

    // Not logged in
    if (!user) {
      router.replace('/admin/login');
      return;
    }

    // Wait until Firebase fully loads user
    if (!user.email) return;

    // Only admin allowed
    if (user.email !== ADMIN_EMAIL) {
      signOut(auth);
      alert('Access denied: Admin only');
      router.replace('/admin/login');
      return;
    }

    // Auth success
    setAuthLoading(false);
  });

  return () => unsubscribe();
}, [router]);

  /* 🔄 Real-time Firestore */
  useEffect(() => {
    if (authLoading) return;

    const q = query(
      collection(db, 'feedback'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Feedback[];

        setFeedbackList(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching feedback:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [authLoading]);

  /* 🚪 Logout */
  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/admin/login');
  };

  /* 🗑 DELETE FEEDBACK (NEW FEATURE) */
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this feedback?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'feedback', id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete feedback');
    }
  };

  /* ⏳ Auth loading screen */
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              Feedback Hub
            </Link>
          </div>

          <nav className="flex-1 px-4 py-4 text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-3 text-primary"
            >
              <Inbox className="h-4 w-4" />
              Feedback Inbox
            </Link>

            <Link
              href="/admin/settings"
              className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>

          <div className="border-t p-4">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div>
            <h1 className="text-xl font-semibold">Feedback Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              All user submitted feedback (real-time)
            </p>
          </div>
        </header>

        <div className="flex-1 p-6">
          {loading ? (
            <p className="text-muted-foreground">Loading feedback...</p>
          ) : feedbackList.length === 0 ? (
            <p className="text-muted-foreground">No feedback found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {feedbackList.map(item => (
                <Card key={item.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold">
                        {item.id.slice(0, 6)}
                      </CardTitle>
                      <Badge>New</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {item.createdAt?.toDate().toLocaleString()}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {item.feedback}
                    </p>

                    {item.imageBase64 ? (
                      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-md border">
                        <Image
                          src={item.imageBase64}
                          alt="Feedback attachment"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="mt-4 flex aspect-video items-center justify-center rounded-md border-2 border-dashed">
                        <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                        <span className="ml-2 text-xs text-muted-foreground">
                          No attachment
                        </span>
                      </div>
                    )}
                  </CardContent>

                  {/* ⭐ UPDATED FOOTER */}
                 <CardFooter className="flex gap-2">
                 <Link href={`/admin/feedback/${item.id}`} className="w-full">
                 <Button variant="outline" size="sm" className="w-full">
                View Details
                </Button>
                </Link>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>

                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}