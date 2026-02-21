import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, MessageSquarePlus } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="container relative">
      <section className="grid min-h-[calc(100vh-10rem)] items-center gap-12 py-8 md:grid-cols-2 md:py-12 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-balance text-left text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Turn Customer Feedback Into Business Growth with{' '}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent-foreground/80 bg-clip-text text-transparent">
              Feedback Hub
            </span>
          </h1>
          <p className="max-w-2xl text-balance text-left text-lg text-muted-foreground">
            Our intuitive platform empowers you to collect, manage, and analyze
            customer feedback at scale. Transform valuable insights into actionable strategies and build better products.
          </p>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/feedback">
                Submit Feedback <MessageSquarePlus />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/admin">
                Admin Login <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-2xl md:h-[450px]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
        </div>
      </section>
    </div>
  );
}
