'use client'

import { maxLength, minLength, set, z } from 'zod'
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
import { useState } from 'react'
import Image from 'next/image'
import { createAccount } from '@/lib/actions/users.actions'
import OTPModal from './OTPModal'

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    username: formType === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
  })
}

type FormType = 'sign-in' | 'sign-up'

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [accountId, setAccountId] = useState(null)

  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const user = await createAccount({
        username: values.username || '',
        email: values.email,
      })
      setAccountId(user.accountId)
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
            <div className=" border-gray-300 border-[3px] rounded-2xl p-8 sm:p-10 space-y-8 transition-all hover:border-gray-400">
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
                          className="border-0 bg-transparent text-lg sm:text-xl md:text-2xl px-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 placeholder:text-lg placeholder:sm:text-xl placeholder:md:text-2xl"
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
                          className="border-0 bg-transparent text-lg sm:text-xl md:text-2xl px-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 placeholder:text-lg placeholder:sm:text-xl placeholder:md:text-2xl"
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
            className="w-full form-submit-button text-lg sm:text-xl items-center justify-center hover:bg-blue-100 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loading"
                width={24}
                height={24}
                className="animate-spin"
              />
            ) : type == 'sign-in' ? (
              'Sign In'
            ) : (
              'Sign Up'
            )}
          </Button>
          {errorMessage && <p className="error-message">*{errorMessage}</p>}
        </form>
      </Form>
      {/*OTP Verification Modal*/}

      {accountId && <OTPModal email={form.getValues('email')} accountId={accountId} />}

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
        className="w-full py-6 text-base sm:text-lg rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
      >
        <img src="/assets/icons/google.svg" alt="Google logo" className="w-6 h-6" />
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
