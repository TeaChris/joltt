import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const userId = await currentUserId()
    const role = await currentRole()

    if (!userId || role !== UserRole.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { name, categoryId, price, description, size } = await req.json()

    const product = await db.products.create({
      data: {
        userId,
        name,
        categoryId,
        price,
        description,
        size,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log('[CREATE_PRODUCT]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
