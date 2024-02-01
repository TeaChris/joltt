import Stripe from 'stripe'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { currentUserId } from '@/lib/auth'

export async function POST(req: Request) {
  const { productIds, productNames, productPrice } = await req.json()
  const userId = await currentUserId()

  const name = productNames.join(', ')
  const totalPrice = productPrice.reduce(
    (acc: number, price: number) => acc + price,
    0
  )

  if (!productIds || productIds.length === 0) {
    return new NextResponse('Product ids are required', { status: 400 })
  }

  const products = await db.products.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
        },
        unit_amount: Number(product.price) * 100,
      },
    })
  })

  const order = await db.orders.create({
    data: {
      // @ts-ignore
      userId,
      isPaid: false,
      name: name,
      price: totalPrice,
      orderItem: {
        create: productIds.map((productId: string) => ({
          products: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/products/thank-you?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  })

  return NextResponse.json({ url: session.url })
}
