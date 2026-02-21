'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Paperclip, Send, X } from 'lucide-react';
import Image from 'next/image';

const feedbackFormSchema = z.object({
  feedback: z
    .string()
    .min(10, { message: 'Please provide at least 10 characters of feedback.' })
    .max(1000, { message: 'Feedback must not exceed 1000 characters.' }),
  attachment: z.any().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export default function FeedbackPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // ⭐ NEW: dynamic site name
  const [siteName, setSiteName] = useState('Submit Your Feedback');

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      feedback: '',
    },
  });

  // ⭐ LOAD SETTINGS FROM FIRESTORE
 useEffect(() => {
  const docRef = doc(db, 'settings', 'general');

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      setSiteName(docSnap.data().siteName || 'Submit Your Feedback');
    }
  });

  return () => unsubscribe();
}, []);

  // -------- IMAGE HANDLER --------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 300 * 1024) {
        form.setError('attachment', {
          type: 'manual',
          message: 'Image size should not exceed 300KB.',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      form.setValue('attachment', file);
      form.clearErrors('attachment');
    } else {
      setPreview(null);
      form.setValue('attachment', undefined);
    }
  };

  const removePreview = () => {
    setPreview(null);
    form.setValue('attachment', undefined);
    const fileInput = document.getElementById('attachment') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // 🔥 SUBMIT LOGIC (UNCHANGED)
  async function onSubmit(data: FeedbackFormValues) {
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        feedback: data.feedback,
        imageBase64: preview || null,
        createdAt: serverTimestamp(),
      });

      form.reset();
      removePreview();

      toast({
        title: 'Success!',
        description: 'Your feedback has been submitted successfully.',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-xl">
        <Card>
          <CardHeader className="text-center">
            {/* ⭐ TITLE NOW DYNAMIC */}
            <CardTitle className="text-3xl">{siteName}</CardTitle>

            <CardDescription>
              We value your opinion. Found a bug, have a suggestion, or want to praise something? Let us know.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your experience, suggest an improvement, or report an issue..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attachment"
                  render={() => (
                    <FormItem>
                      <FormLabel>Attach a Screenshot (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="attachment"
                            type="file"
                            accept="image/*"
                            className="pl-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            onChange={handleFileChange}
                            disabled={!!preview}
                          />
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {preview && (
                  <div className="relative mt-4 overflow-hidden rounded-md border">
                    <Image
                      src={preview}
                      alt="Image preview"
                      width={500}
                      height={280}
                      className="aspect-video w-full object-contain"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={removePreview}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full gap-2"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'} <Send />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}