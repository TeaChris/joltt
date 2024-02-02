'use client'

import { useRouter } from 'next/navigation'

import axios from 'axios'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

import { ReviewSchemaValidator, TReviewSchemaValidator } from '@/schemas'

import { Send } from 'lucide-react'

import { toast } from 'sonner'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import Link from 'next/link'

export default function ReviewInput({
  params,
}: {
  params: { productId: string }
}) {
  const router = useRouter()
  const { productId } = params

  const form = useForm<z.infer<typeof ReviewSchemaValidator>>({
    resolver: zodResolver(ReviewSchemaValidator),
    defaultValues: {},
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: TReviewSchemaValidator) => {
    try {
      await axios.post(`/api/products/${productId}/reviews`, values)
      toast.success('Product was successfully posted')
      form.reset()
      router.push(`/products/${params.productId}`)
    } catch (error) {
      toast.error('Something went wrong, please try again')
    }
  }
  return (
    <MaxWidthWrapper>
      <Link
        href={`/products/${params.productId}`}
        className={buttonVariants({ variant: 'ghost', className: 'mt-4' })}
      >
        {'< Back'}
      </Link>

      <div className="space-y-4 w-full sm:w-1/2 mx-auto mt-20">
        <h5 className="font-bold text-3xl sm:text-4xl">Post a review</h5>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2 relative mt-10 mx-auto"
          >
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem className="grid gap-1 py-2">
                  <FormControl>
                    <div className="w-full space-y-1">
                      <Input placeholder="Enter product review" {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              size={'lg'}
              disabled={isSubmitting || !isValid}
              type="submit"
              className="top-[0.6rem] right-1 absolute h-fit px-3 py-2"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </Form>
      </div>
    </MaxWidthWrapper>
  )
}
