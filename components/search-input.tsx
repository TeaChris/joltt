'use client'

import { Search } from 'lucide-react'

import { Input } from './ui/input'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useDebounce } from '@/hooks/use-debounce'

import qs from 'query-string'

export function SearchInput() {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce(value)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentCategoryId = searchParams.get('categoryId')

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    )
    router.push(url)
  }, [debouncedValue, currentCategoryId, router, pathname])

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[650px] pl-9 rounded-full bg-slate-50 focus-visible:ring-slate-200"
        placeholder="Search products"
      />
    </div>
  )
}
