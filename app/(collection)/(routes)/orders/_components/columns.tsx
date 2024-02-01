'use client'

import { ArrowUpDown } from 'lucide-react'
import { Orders } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product(s)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price') || '0')
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'isPaid',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payment status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPaid = row.getValue('isPaid') || false

      return (
        <Badge className={cn('bg-rose-500', isPaid && 'bg-emerald-500')}>
          {isPaid ? 'Paid' : 'Pending'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'delivery',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Delivery status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const delivery = row.getValue('PENDING') || false

      return (
        <Badge className={cn('bg-emerald-500', delivery && 'bg-amber-500')}>
          {delivery ? 'Pending' : 'Delivered'}
        </Badge>
      )
    },
  },
]
