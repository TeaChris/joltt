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

export function ProductForm() {
  const isPending = false
  return (
    <form onSubmit={() => {}}>
      <div className="grid gap-2">
        {/* product name */}
        <div className="grid gap-1 py-2">
          <Label htmlFor="name">Product name</Label>
          <Input className={cn({})} placeholder="Crop top" />
          {<p className="text-sm text-red-500"></p>}
        </div>

        {/* product  price*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="name">Product price</Label>
          <Input className={cn({})} placeholder="price in USD" />
          {<p className="text-sm text-red-500"></p>}
        </div>

        {/* product  size*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="name">Product size</Label>
          <Input className={cn({})} placeholder="Product size 'eg: size 45'" />
          {<p className="text-sm text-red-500"></p>}
        </div>

        {/* product  description*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="description">Product description</Label>
          <Textarea
            className={cn({})}
            placeholder="Quality top from amazing ladies"
          />
          {<p className="text-sm text-red-500"></p>}
        </div>

        {/* product  category*/}
        <div className="grid gap-1 py-2">
          <Label htmlFor="description">Product category</Label>
          <Input
            className={cn({})}
            placeholder="Select a category best fit for you product"
          />
          {<p className="text-sm text-red-500"></p>}
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
