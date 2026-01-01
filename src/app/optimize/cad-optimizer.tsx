'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { optimizeCadModelForWeb, OptimizeCadModelOutput } from '@/ai/flows/optimize-cad-models-for-web';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader, UploadCloud, Download, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  file: z.any()
    .refine(files => files?.length === 1, 'Please upload one file.')
    .refine(files => files?.[0]?.size <= 10 * 1024 * 1024, 'File size must be 10MB or less.')
    .refine(files => {
        const file = files?.[0];
        if (!file) return false;
        // Common 3D model formats. 'application/octet-stream' is a fallback for .glb
        return ['model/gltf-binary', 'model/gltf+json', 'application/octet-stream'].includes(file.type);
    }, 'Invalid file type. Please upload a .glb or .gltf file.'),
});

export default function CadOptimizer() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeCadModelOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register('file');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);

    const file = values.file[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const cadModelDataUri = reader.result as string;
      try {
        const optimizationResult = await optimizeCadModelForWeb({ cadModelDataUri });
        setResult(optimizationResult);
        toast({
          title: "Optimization Complete!",
          description: "Your model has been successfully optimized.",
        });
      } catch (error) {
        console.error('Optimization failed:', error);
        toast({
          variant: "destructive",
          title: "Optimization Failed",
          description: "An error occurred while optimizing your model. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast({
            variant: "destructive",
            title: "File Read Error",
            description: "Could not read the selected file.",
        });
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <FormLabel>CAD Model File (.gltf, .glb)</FormLabel>
                <FormControl>
                    <div className="relative">
                        <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                        <Input type="file" {...fileRef} className="pl-10" accept=".gltf,.glb" />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              'Optimize Model'
            )}
          </Button>
        </form>
      </Form>
      
      {result && (
        <Card className="animate-fade-in-up border-border/40">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Optimization Result
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Optimization Strategy:</h4>
                    <p className="text-muted-foreground">{result.optimizationStrategy}</p>
                </div>
                <a
                    href={result.optimizedCadModelDataUri}
                    download="optimized-model.glb"
                >
                    <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Optimized Model
                    </Button>
                </a>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
