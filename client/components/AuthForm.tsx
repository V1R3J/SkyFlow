'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

type FormType = 'sign-in' | 'sign-up'

const AuthForm = ({ type }: { type: FormType }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked')
    // Add your Google OAuth logic here
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold
           mb-12 tracking-tight"
            style={{
              fontFamily:
                'SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
            }}
          >
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>

          {type === 'sign-up' && (
            <div className="border border-gray-300 rounded-2xl p-8 sm:p-10 space-y-8 transition-all hover:border-gray-400">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-4 pb-8 border-b border-gray-200">
                      <FormLabel className="text-xl sm:text-2xl font-medium text-gray-900">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="border-0 bg-transparent text-xl sm:text-2xl px-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-base" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-4">
                      <FormLabel className="text-xl sm:text-2xl font-medium text-gray-900">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="border-0 bg-transparent text-xl sm:text-2xl px-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-base" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button
            type="submit"
            className="form-submit-button w-full bg-black hover:bg-gray-800 text-white font-medium py-6 text-base sm:text-lg rounded-xl transition-all duration-200 shadow-sm hover:shadow-md mt-8"
          >
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Sign-In with Google button */}
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full py-6 text-base sm:text-lg rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
        </svg>
        Sign {type === 'sign-in' ? 'in' : 'up'} with Google
      </Button>

      {/* Account link */}
      <div className="mt-8 text-center">
        <p className="text-base text-gray-600">
          {type === 'sign-in' ? (
            <>
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="font-semibold text-brand-text hover:text-brand-text-dark transition-colors underline"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="font-semibold text-brand-text hover:text-brand-text-dark transition-colors underline"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default AuthForm
