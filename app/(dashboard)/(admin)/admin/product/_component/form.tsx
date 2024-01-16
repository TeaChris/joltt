'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'

import { Loader2 } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ProductSchemaValidator, TProductSchemaValidator } from '@/schemas'
import { Combo } from './Combo'

interface Props {
  options: { label: string; value: string }[]
}

export function ProductForm({ options }: Props) {
  const isPending = false

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProductSchemaValidator>({
    resolver: zodResolver(ProductSchemaValidator),
  })

  const onSubmit = (values: TProductSchemaValidator) => {}
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        {/* product name */}
        <div className="grid gap-1 py-2">
          <Label htmlFor="name">Product name</Label>
          <Input
            {...register('name')}
            className={cn({ 'focus-visible:ring-red-500': errors.name })}
            placeholder="Crop top"
          />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* product  price*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="name">Product price</Label>
          <Input
            {...register('price')}
            className={cn({ 'focus-visible:ring-red-500': errors.price })}
            placeholder="price in USD"
          />
          {errors?.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* product  size*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="name">Product size</Label>
          <Input
            {...register('size')}
            className={cn({ 'focus-visible:ring-red-500': errors.size })}
            placeholder="Product size 'eg: size 45'"
          />
          {errors?.size && (
            <p className="text-sm text-red-500">{errors.size.message}</p>
          )}
        </div>

        {/* product  description*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="description">Product description</Label>
          <Textarea
            {...register('description')}
            className={cn({ 'focus-visible:ring-red-500': errors.description })}
            placeholder="Quality top from amazing ladies"
          />
          {errors?.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* product  category*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="description">Product category</Label>
          <Combo options={options} />
          {errors?.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating product...
            </>
          ) : (
            <>Create product</>
          )}
        </Button>
      </div>
    </form>
  )
}
