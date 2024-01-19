import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = await currentUserId()
    const role = await currentRole()
    const values = await req.json()
    const { productId } = params

    if (!userId || role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const product = await db.products.update({
      where: {
        id: productId,
        userId,
      },
      data: {
        ...values,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
