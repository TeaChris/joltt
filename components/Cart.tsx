'use client'

import { ShoppingCart } from 'lucide-react'

import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/use-cart'

export function Cart() {
  const { items } = useCart()
  const itemCount = items.length
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Link
      href="/cart"
      className={buttonVariants({
        variant: 'ghost',
        className: 'hover:bg-transparent',
      })}
    >
      <ShoppingCart
        aria-hidden="true"
        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
      />
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
        {isMounted ? itemCount : 0}
      </span>
    </Link>
  )
}
