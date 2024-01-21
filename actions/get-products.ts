import { Products, Category } from '@prisma/client'
import { db } from '@/lib/db'

type ProductWithCategory = {
  category: Category | null
}

type GetProducts = {
  userId: string
  name?: string
  categoryId?: string
}

export async function getProducts({
  userId,
  name,
  categoryId,
}: GetProducts): Promise<ProductWithCategory[]> {
  try {
    // get all products
    const products = await db.products.findMany({
      where: {
        isPublished: true, // get only publish products
        name: {
          contains: name, // by names
        },
        categoryId, //by categoryId
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products
  } catch (error) {
    console.log('[GET_PRODUCTS', error)
    return []
  }
}
