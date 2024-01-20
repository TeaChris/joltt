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

interface Props {
  productId: string | null
}

export default function Page({ params }: { params: { productId: string } }) {
  const { productId } = params

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: '',
    },
  })

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

      <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="grid gap-6">
            <h3 className="font-semibold">Upload product image</h3>
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
      </div>
    </div>
  )
}
