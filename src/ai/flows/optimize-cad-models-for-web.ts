'use server';
/**
 * @fileOverview An AI agent for optimizing CAD models for web viewing.
 *
 * - optimizeCadModelForWeb - A function that handles the CAD model optimization process.
 * - OptimizeCadModelInput - The input type for the optimizeCadModelForWeb function.
 * - OptimizeCadModelOutput - The return type for the optimizeCadModelForWeb function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeCadModelInputSchema = z.object({
  cadModelDataUri: z
    .string()
    .describe(
      "A CAD model file (e.g., gltf, glb) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OptimizeCadModelInput = z.infer<typeof OptimizeCadModelInputSchema>;

const OptimizeCadModelOutputSchema = z.object({
  optimizedCadModelDataUri: z
    .string()
    .describe(
      'The optimized CAD model file as a data URI, ready for web viewing.'
    ),
  optimizationStrategy: z
    .string()
    .describe(
      'A description of the optimization strategy used (e.g., simplification, compression).'      
    ),
});
export type OptimizeCadModelOutput = z.infer<typeof OptimizeCadModelOutputSchema>;

export async function optimizeCadModelForWeb(
  input: OptimizeCadModelInput
): Promise<OptimizeCadModelOutput> {
  return optimizeCadModelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCadModelPrompt',
  input: {schema: OptimizeCadModelInputSchema},
  output: {schema: OptimizeCadModelOutputSchema},
  prompt: `You are an expert in 3D CAD model optimization for web viewing. You will receive a CAD model file as a data URI. Your task is to determine an optimal strategy to reduce the file size and improve rendering performance for web browsers, while maintaining acceptable visual quality. You should describe the optimization strategy used and return the optimized CAD model also as data URI.

Consider simplification techniques (e.g., mesh simplification, polygon reduction), compression methods (e.g., Draco compression), and texture optimization.

CAD Model: {{media url=cadModelDataUri}}
`,
});

const optimizeCadModelFlow = ai.defineFlow(
  {
    name: 'optimizeCadModelFlow',
    inputSchema: OptimizeCadModelInputSchema,
    outputSchema: OptimizeCadModelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
