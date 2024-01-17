'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'

import { Loader2 } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchemaValidator, TProductSchemaValidator } from '@/schemas'
import { useTransition } from 'react'
import { createProduct } from '@/actions/create-product'
import { toast } from 'sonner'
import { Combobox } from '@/components/ui/combobox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

import * as z from 'zod'

interface Props {
  options: { label: string; value: string }[]
}

export function ProductForm({ options }: Props) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ProductSchemaValidator>>({
    resolver: zodResolver(ProductSchemaValidator),
    defaultValues: {},
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = (values: TProductSchemaValidator) => {
    startTransition(() => {
      createProduct(values).then((data) => {
        if (data.success) {
          toast.success(data.success)
        } else {
          toast.error(data.error)
        }
      })
    })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          {/* product name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-1 py-2">
                <FormControl>
                  <div className="w-full space-y-1">
                    <FormLabel htmlFor="name">Product name</FormLabel>
                    <Input placeholder="Crop top" {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* product price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="grid gap-1 py-2">
                <FormControl>
                  <div className="w-full space-y-1">
                    <FormLabel htmlFor="price">Product Price</FormLabel>
                    <Input placeholder="Enter the product price" {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* product size */}
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="grid gap-1 py-2">
                <FormControl>
                  <div className="w-full space-y-1">
                    <FormLabel htmlFor="size">Product size</FormLabel>
                    <Input
                      placeholder="Enter the product size 'e.g: Size 45'"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* product size */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid gap-1 py-2">
                <FormControl>
                  <div className="w-full space-y-1">
                    <FormLabel htmlFor="description">
                      Product description
                    </FormLabel>
                    <Textarea
                      placeholder="Quality crop-top for teenage ladies"
                      {...field}
                    ></Textarea>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* product categoryId */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="grid gap-1 py-2">
                <FormControl>
                  <div className="w-full space-y-1">
                    <FormLabel htmlFor="categoryId">Product category</FormLabel>
                    {/* @ts-ignore */}
                    <Combobox options={options} {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button size={'lg'} disabled={isPending || !isValid} type="submit">
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>Continue</>
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}
