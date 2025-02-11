'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';

type AuthFormType = 'sign-in' | 'sign-up';

type Props = {
  type: AuthFormType;
};

const AuthForm = ({ type }: Props) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const authFormSchema = (formType: AuthFormType) => {
    return z.object({
      email: z.string().email(),
      fullName: formType === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
    });
  };

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // Simulate an async operation
      await new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Submission failed')), 2000)
      );
    } catch (error) {
      setErrorMessage('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1>{type === 'sign-up' ? 'Sign Up' : 'Sign In'}</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormDescription>We'll never share your email with anyone else.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {type === 'sign-up' && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>Please enter your full name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex items-center gap-2">
          <p>{type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}</p>
          <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
