'use client'

import { cn } from '@/lib/utils'
import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IconType } from 'react-icons'

interface Props {
  label: string
  value?: string
}

export function CategoryItem({ label, value }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get('categoryId')
  const currentTitle = searchParams.get('title')

  const isSelected = currentCategoryId === value

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-primary transition',
        isSelected && 'border-none bg-primary text-secondary'
      )}
      type="button"
    >
      <div className="truncate">{label}</div>
    </button>
  )
}
