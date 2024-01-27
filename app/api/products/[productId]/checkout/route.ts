import { currentUser, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await currentUser()

    if (!user || !user.id || !user.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const product = await db.products.findUnique({
      where: {
        id: params.productId,
        isPublished: true,
      },
    })

    const order = await db.orders.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: params.productId,
        },
      },
    })

    if (order) {
      return new NextResponse('Already purchased', { status: 400 })
    }

    if (!product) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: Math.round(product.price! * 100),
        },
      },
    ]

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    })

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      })

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/products/thank-you?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/products/canceled?canceled=1`,
      metadata: {
        productId: product.id,
        userId: user.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.log('[PRODUCT_ID_CHECKOUT]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
