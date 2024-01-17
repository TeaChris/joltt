'use server'

import { ProductSchemaValidator, TProductSchemaValidator } from '@/schemas'
import { db } from '@/lib/db'
import { currentUser, currentUserId } from '@/lib/auth'
import { NextResponse } from 'next/server'

export const createProduct = async (values: TProductSchemaValidator) => {
  const userId = await currentUserId()

  if (!userId) {
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
