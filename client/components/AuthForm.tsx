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
import { useState } from 'react'
import Image from 'next/image'
import { createAccount, signInUser } from '@/lib/actions/users.actions'
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
      const user =
        type === 'sign-up'
          ? await createAccount({
              username: values.username || '',
              email: values.email,
            })
          : await signInUser({ email: values.email })

      setAccountId(user.accountId)
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h1
            className="text-3xl lg:text-4xl font-semibold mb-8 tracking-tight"
            style={{
              fontFamily:
                'SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
            }}
          >
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>

          <div className="border-gray-300 border-2 rounded-xl p-6 space-y-6 transition-all hover:border-gray-400">
            {type === 'sign-up' && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-3 pb-6 border-b border-gray-200">
                      <FormLabel className="text-lg font-medium text-gray-900">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="border-0 bg-transparent text-base px-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </div>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-3">
                    <FormLabel className="text-lg font-medium text-gray-900">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="border-0 bg-transparent text-base px-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full form-submit-button text-base items-center justify-center hover:bg-blue-100 transition-colors h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loading"
                width={20}
                height={20}
                className="animate-spin"
              />
            ) : type == 'sign-in' ? (
              'Sign In'
            ) : (
              'Sign Up'
            )}
          </Button>
          {errorMessage && <p className="error-message text-sm">*{errorMessage}</p>}
        </form>
      </Form>

      {accountId && <OTPModal email={form.getValues('email')} accountId={accountId} />}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
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
