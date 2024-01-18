'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import Link from 'next/link'

export default function Page({ params }: { params: { productId: string } }) {
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

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="grid gap-6"></div>
      </div>
    </div>
  )
}
