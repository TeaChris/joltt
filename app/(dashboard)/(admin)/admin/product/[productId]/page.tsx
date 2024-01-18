'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page({ params }: { params: { productId: string } }) {
  return (
    <div className="space-y-12">
      <Link
        href={'/admin/product'}
        className={buttonVariants({ variant: 'ghost' })}
      >&lt; Back</Link>
      
    </div>
  )
}
