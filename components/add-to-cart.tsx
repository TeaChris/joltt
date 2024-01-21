'use client'

interface Props {
  product: Products
}

import { Products } from '@prisma/client'
import { Button } from './ui/button'

export function AddToCartButton({ product }: Props) {
  return (
    <Button size="lg" className="w-full">
      Added
    </Button>
  )
}
