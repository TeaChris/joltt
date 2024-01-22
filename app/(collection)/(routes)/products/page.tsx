import { getProducts } from '@/actions/get-products'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { Categories } from '@/components/categories'
import { ProductList } from '@/components/product-list'
import { SearchInput } from '@/components/search-input'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: { title: string; categoryId: string }
}

export default async function Page({ searchParams }: Props) {
  const userId = await currentUserId()

  if (!userId) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  // @ts-ignore
  const products = await getProducts({ userId, ...searchParams })

  return (
    <MaxWidthWrapper className="space-y-4">
      <div className="px-6 pt-6 w-full flex items-center justify-center">
        <SearchInput />
      </div>

      <div className="w-full flex items-center justify-center">
        <Categories items={categories} />
      </div>

      {/* @ts-ignore */}
      <ProductList items={products} title="Browse high quality collections" />
    </MaxWidthWrapper>
  )
}
