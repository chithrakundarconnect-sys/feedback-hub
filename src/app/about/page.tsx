import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Users, BarChart } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Streamlined Collection',
    description: 'Easily gather feedback through a simple and intuitive submission form.',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Centralized Management',
    description: 'View and organize all customer feedback in one powerful admin dashboard.',
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: 'Insightful Analytics',
    description: 'Identify trends and key metrics with at-a-glance dashboard statistics.',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Actionable Insights',
    description: 'Filter and review feedback to make data-driven product decisions.',
  },
];

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Why Feedback Hub?</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Feedback Hub is engineered to be the all-in-one solution for modern teams looking to build user-centric products. We bridge the gap between user opinions and product development.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
           <Card key={feature.title} className="text-center">
            <CardHeader className="items-center">
              <div className="rounded-full bg-primary/10 p-3">
                {feature.icon}
              </div>
              <CardTitle className="mt-4">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-16 text-center">
          <p className="text-lg font-semibold">Ready to get started?</p>
          <p className="mt-2 text-muted-foreground">
            Begin by submitting feedback or exploring our admin dashboard.
          </p>
        </div>
    </div>
  );
}
