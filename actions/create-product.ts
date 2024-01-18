'use server'

import { ProductSchemaValidator, TProductSchemaValidator } from '@/schemas'
import { db } from '@/lib/db'
import { currentRole, currentUserId } from '@/lib/auth'
import { UserRole } from '@prisma/client'

export const createProduct = async (values: TProductSchemaValidator) => {
  const userId = await currentUserId()
  const role = await currentRole()

  if (!userId || role !== UserRole.ADMIN) {
    return { error: 'Unauthorized' }
  }

  const validatedProducts = ProductSchemaValidator.safeParse(values)

  if (!validatedProducts.success) {
    return { error: 'Something went wrong' }
  }

  const { name, categoryId, price, description, size } = validatedProducts.data

  await db.products.create({
    data: {
      userId,
      name,
      description,
      price,
      categoryId,
      size,
    },
  })

  return { success: 'Product created' }
}
