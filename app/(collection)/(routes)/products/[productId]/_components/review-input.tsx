'use client'

import { useRouter } from 'next/navigation'

import axios from 'axios'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

import { ReviewSchemaValidator, TReviewSchemaValidator } from '@/schemas'

import { Send } from 'lucide-react'

import { toast } from 'sonner'

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
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong, please try again')
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 relative"
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
    </>
  )
}
