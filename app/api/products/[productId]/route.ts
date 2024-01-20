import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = await currentUserId()
    const role = await currentRole()
    const { productId } = params

    if (!userId || role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const product = await db.products.findUnique({
      where: {
        id: productId,
        userId,
      },
    })

    if (!product) {
      return new NextResponse('Not found', { status: 404 })
    }

    const deleted = await db.products.delete({
      where: {
        id: productId,
      },
    })

    return NextResponse.json(deleted)
  } catch (error) {
    console.log('[PRODUCT_ID_DELETE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

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
