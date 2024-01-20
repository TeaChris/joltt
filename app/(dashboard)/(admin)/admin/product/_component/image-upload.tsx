'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Products } from '@prisma/client'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'
import { ImageIcon, Pencil, PlusCircle, Trash } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
  initialData: Products
  productId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
})

export function ImageUpload({ initialData, productId }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const router = useRouter()

  const toggleEdit = () => setIsEditing((current) => !current)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/products/${productId}`, values)
      toggleEdit()
      router.refresh()
      toast.success('Product image upload successfully')
    } catch {
      toast.error('Something went wrong, please try agin')
    }
  }

  return (
    <div className="container relative flex space-y-8 pt-10 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px]">
        <div className="grid gap-6">
          <div className="w-full flex justify-between items-center">
            <h3>Upload product image</h3>
            <Button variant="ghost" onClick={toggleEdit}>
              {!initialData.imageUrl ? (
                <Pencil className="h-4 w-4 mr-2" />
              ) : (
                <PlusCircle className="h-4 w-4 mr-2" />
              )}
            </Button>
          </div>

          {!isEditing &&
            (!initialData.imageUrl ? (
              <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-500" />
              </div>
            ) : (
              <div className="relative aspect-video mt-2">
                <Image
                  alt="Upload"
                  fill
                  className="object-cover rounded-md"
                  src={initialData.imageUrl}
                />
              </div>
            ))}

          {isEditing && (
            <div>
              <FileUpload
                endpoint="productImg"
                onChange={(url) => {
                  if (url) {
                    onSubmit({ imageUrl: url })
                  }
                }}
              />
              <div className="text-xs text-muted-foreground mt-4">
                16:9 aspect ratio recommended
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full sm:w-[700px] px-4 flex flex-col space-y-2">
        <Button>Publish product</Button>
        <Button variant={'outline'}>
          <>
            <Trash className="w-4 h-5" />{'  '}
            Delete product
          </>
        </Button>
      </div>
    </div>
  )
}
