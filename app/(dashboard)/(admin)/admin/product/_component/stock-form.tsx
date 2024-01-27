'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'

import { useForm } from 'react-hook-form'

import { Loader2, Pencil } from 'lucide-react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
  data: {
    stock: string
  }
  id: string
}

const formSchema = z.object({
  stock: z.coerce.number(),
})

export function StockForm(props: Props) {
  const { data, id } = props

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // @ts-expect-error
    defaultValues: data.stock,
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/products/${id}`, values)
      toast.success('Product stock updated successfullt')
      toggleEdit()
      router.refresh()
    } catch {
      toast('Something went wrong, please try again')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Product stock
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{data.stock}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '6'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Update</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
