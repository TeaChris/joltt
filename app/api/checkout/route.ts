import { CartItem } from '@/hooks/use-cart'
import { currentUser, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { CartProductType } from '@/types'

import { NextResponse } from 'next/server'

const orderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * (item.quantity || 1) // Consider item quantity if available

    return acc + itemTotal // Use addition to accumulate the total price
  }, 0)

  return totalPrice // Return the accumulated total price
}

export async function POST(req: Request) {
  const user = await currentUser()
  const id = await currentUserId()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const body = await req.json()

  const { items, payment_intent_id } = body
  const total = orderAmount(items) * 100
  const orderData = {
    user: { connect: { id: id } },
    amount: total,
    currency: 'usd',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  }

  if (payment_intent_id) {
    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    )

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      )
      // update order

      const [existingOrder, updatedOrder] = await Promise.all([
        db.orders.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        db.orders.update({
          where: {
            amount: total,
            products: items,
          },
        }),
      ])
      if (!existingOrder) {
        return new NextResponse('Invalid Payment Intent', { status: 400 })
      }

      return NextResponse.json({ paymentIntent: updatedIntent })
    }
  } else {
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })
    // create order
    orderData.paymentIntentId = paymentIntent.id

    await db.orders.create({
      data: {
        orderData,
        // @ts-ignore
        userEmail: user.email,
      },
    })

    return NextResponse.json({ paymentIntent })
  }
}
