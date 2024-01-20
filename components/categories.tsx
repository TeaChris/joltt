'use client'

import { Category } from '@prisma/client'
import { CategoryItem } from './category'

interface Props {
  items: Category[]
}

export function Categories({ items }: Props) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  )
}
