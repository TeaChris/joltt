import Stripe from 'stripe'

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`[WEBHOOK_ERROR]: ${error.message}`, {
      status: 400,
    })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const address = session?.customer_details?.address

  const addComp = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]

  const addString = addComp.filter((c) => c !== null).join(', ')

  if (event.type === 'checkout.session.completed') {
    const order = await db.orders.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addString,
        phone: session?.customer_details?.phone || '',
      },
      include: {
        orderItem: true,
      },
    })

    const productIds = order.orderItem.map((orderItem) => orderItem.productId)

    await db.products.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
