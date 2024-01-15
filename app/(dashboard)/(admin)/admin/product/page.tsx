'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { cn } from '@/lib/utils'

import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

import { useRouter } from 'next/navigation'

export default function AdmibDashboard() {
  const isPending = false
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="grid gap-6">
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
                  <Input className={cn({})} placeholder="price in USD" />
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
                    placeholder="Quality top from amazing ladies"
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
          </div>
        </div>
      </div>
    </>
  )
}
