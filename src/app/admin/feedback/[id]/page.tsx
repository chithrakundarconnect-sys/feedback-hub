'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Feedback = {
  feedback: string;
  createdAt: any;
  imageBase64?: string | null;
};

export default function FeedbackDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [data, setData] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const docRef = doc(db, 'feedback', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as Feedback);
        } else {
          alert('Feedback not found');
          router.push('/admin');
        }
      } catch (error) {
        console.error(error);
        alert('Error loading feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading feedback...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Feedback Details</h1>

      <div className="space-y-4 border rounded-lg p-6">
        <div>
          <p className="text-sm text-muted-foreground">Submitted on:</p>
          <p className="font-medium">
            {data.createdAt?.toDate().toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Message:</p>
          <p className="text-lg">{data.feedback}</p>
        </div>

        {data.imageBase64 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Attachment:</p>
            <div className="relative w-full h-[300px] border rounded-md overflow-hidden">
              <Image
                src={data.imageBase64}
                alt="Feedback Image"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        )}

        <Button onClick={() => router.push('/admin')} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}