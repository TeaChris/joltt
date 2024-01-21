import { Category, Products } from '@prisma/client'
import { ProductCard } from './product-card'
import Link from 'next/link'

type ProductWithCategory = Products & {
  category: Category | null
}

interface Props {
  items: ProductWithCategory[]
  title: string
  subtitle?: string
  href?: string
}

export function ProductList({ items, title, subtitle, href }: Props) {
  // Shuffle the items randomly
  const shuffledItems = [...items].sort(() => Math.random() - 0.5)

  // Take the first 4 items
  const randomItems = shuffledItems.slice(0, 4)

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-muted-foreground hover:text-secondary-foreground md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
              />
            ))}
          </div>
          {items.length === 0 && (
            <div className="text-center tex-sm text-muted-foreground mt-10">
              No products found
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
