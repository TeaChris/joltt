'use client'

import FileUpload from '@/components/file-upload'
import { Button, buttonVariants } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'
import { toast } from 'sonner'
import axios from 'axios'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
})

const stockSchema = z.object({
  stock: z.coerce.number(),
})

interface Props {
  productId: string | null
}

export default function Page({ params }: { params: { productId: string } }) {
  const { productId } = params

  const form = useForm<z.infer<typeof stockSchema>>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      stock: undefined,
    },
  })

  const onClick = async (values: z.infer<typeof stockSchema>) => {
    try {
      await axios.patch(`/api/products/${productId}`, values)
      toast.success('Product updated successfully')
    } catch {
      toast.error('Something went wrong, please try agin')
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/products/${productId}`, values)
      toast.success('Product image upload successfully')
    } catch {
      toast.error('Something went wrong, please try agin')
    }
  }

  return (
    <div className="space-y-12">
      <div className="w-full flex items-center justify-between p-4">
        <Link
          href={'/admin/product'}
          className={buttonVariants({ variant: 'ghost' })}
        >
          &lt; Back
        </Link>

        <div className="space-x-2 flex">
          <Button variant={'ghost'}>
            <Trash className="w-4 h-4" />
          </Button>
          <Button variant="outline">Post</Button>
        </div>
      </div>

      <div className="mx-auto w-full h-fit sm:h-96 flex flex-col space-x-4 sm:flex-row items-start sm:items-center sm:justify-between">
        <div className="w-[45%] h-full px-4">
          <div className="grid gap-6">
            <h3>Upload product image</h3>
            <FileUpload
              endpoint="productImg"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url })
                }
              }}
            />
          </div>
        </div>
        <div className="w-[1px] h-1/2 bg-neutral-200" aria-hidden="true" />
        <div className="w-[45%] h-full px-4">
          <div className="grid gap-6">
            <h3>Upload items in stock</h3>
            <Form {...form}>
              <form
                onClick={form.handleSubmit(onClick)}
                className="w-full space-x-2"
              >
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="stock">Stock</Label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="items in stock"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Continue</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
