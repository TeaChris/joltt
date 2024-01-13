'use client'

import { useState, useTransition } from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/schemas'

import { cn } from '@/lib/utils'

import { ArrowRight, Loader2 } from 'lucide-react'

import { toast } from 'sonner'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Link from 'next/link'
import { logIn } from '@/actions/sign-in'

export default function Page() {
  const [isPending, startTransition] = useTransition()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = (values: TAuthCredentialsValidator) => {
    startTransition(() => {
      logIn(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
          reset()
        }
        if (data?.success) {
          toast.success(data.success)
          reset()
        }
      })
    })
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="text-2xl font-extrabold text-primary">jolt.</div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>
            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href="/auth/sign-up"
            >
              Don&apos;t have and account? Sign-up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="you@example.com"
                    disabled={isPending}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* password */}
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    {...register('password')}
                    type="password"
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder="Password"
                    disabled={isPending}
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button disabled={isPending} type="submit">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>Sign in</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
