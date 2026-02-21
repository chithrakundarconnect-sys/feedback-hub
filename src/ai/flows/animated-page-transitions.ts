'use server';

/**
 * @fileOverview Implements animated page transitions using generative AI.
 *
 * - animatedPageTransitions - A function that provides reusable animated transitions.
 * - AnimatedPageTransitionsInput - The input type for the animatedPageTransitions function.
 * - AnimatedPageTransitionsOutput - The return type for the animatedPageTransitions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimatedPageTransitionsInputSchema = z.object({
  transitionType: z
    .string()
    .describe('The type of transition animation to use (e.g., fade, slide).'),
  direction: z
    .string()
    .optional()
    .describe('The direction of the transition (e.g., left, right, up, down).'),
  duration: z
    .number()
    .optional()
    .describe('The duration of the transition in milliseconds.'),
});
export type AnimatedPageTransitionsInput = z.infer<typeof AnimatedPageTransitionsInputSchema>;

const AnimatedPageTransitionsOutputSchema = z.object({
  animationStyles: z
    .string()
    .describe('CSS styles to apply for the specified transition animation.'),
  transitionFunction: z
    .string()
    .describe('A Javascript function to handle the transition.  It must be usable in a \"use client\" context.'),
});
export type AnimatedPageTransitionsOutput = z.infer<typeof AnimatedPageTransitionsOutputSchema>;

export async function animatedPageTransitions(
  input: AnimatedPageTransitionsInput
): Promise<AnimatedPageTransitionsOutput> {
  return animatedPageTransitionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'animatedPageTransitionsPrompt',
  input: {schema: AnimatedPageTransitionsInputSchema},
  output: {schema: AnimatedPageTransitionsOutputSchema},
  prompt: `You are a UI animation expert, skilled in creating smooth page transitions with CSS and JavaScript.

  Based on the requested transition type, direction, and duration, generate the appropriate CSS styles and a JavaScript function to handle the animation.  The javascript function must work in a \"use client\" context.

  Transition Type: {{{transitionType}}}
  Direction: {{{direction}}}
  Duration: {{{duration}}}ms

  Return the CSS styles as a string and the JavaScript function as a string.
  `,
});

const animatedPageTransitionsFlow = ai.defineFlow(
  {
    name: 'animatedPageTransitionsFlow',
    inputSchema: AnimatedPageTransitionsInputSchema,
    outputSchema: AnimatedPageTransitionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

