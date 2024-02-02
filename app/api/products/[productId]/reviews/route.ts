import { db } from '@/lib/db'
import { currentUserId } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = await currentUserId()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { review } = await req.json()

    const reviews = await db.review.create({
      data: {
        userId,
        productId: params.productId,
        review,
      },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.log('[CREATE_REVIEW]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
