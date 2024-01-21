import { Category, Products } from '@prisma/client'
import { ProductCard } from './product-card'

type ProductWithCategory = Products & {
  category: Category | null
}

interface Props {
  items: ProductWithCategory[]
}

export function ProductList({ items }: Props) {
  // Shuffle the items randomly
  const shuffledItems = [...items].sort(() => Math.random() - 0.5)

  // Take the first 4 items
  const randomItems = shuffledItems.slice(0, 4)

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
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
    </>
  )
}
