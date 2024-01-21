'use client'

import { Products } from '@prisma/client'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'

interface Props {
  product: Products
}

export function AddToCartButton({ product }: Props) {
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])
  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  )
}
