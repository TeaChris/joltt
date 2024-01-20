import { db } from '@/lib/db'
import { currentUserId, currentRole } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = await currentUserId()
    const role = await currentRole()

    if (!userId || role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const product = await db.products.findUnique({
      where: {
        id: params.productId,
        userId,
      },
    })

    if (!product) {
      return new NextResponse('Unauthorized', { status: 404 })
    }

    if (
      !product.name ||
      !product.price ||
      !product.size ||
      !product.stock ||
      !product.categoryId ||
      !product.imageUrl ||
      !product.description
    ) {
      return new NextResponse('Missing required fields', { status: 401 })
    }

    const published = await db.products.update({
      where: {
        id: params.productId,
        userId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(published)
  } catch (error) {
    console.log('[PRODUCT_ID_PUBLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
