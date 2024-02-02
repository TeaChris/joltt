import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { currentUserId } from '@/lib/auth'

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { formatPrice } from '@/lib/format-price'
import { Check, Shield } from 'lucide-react'
import Image from 'next/image'
import { AddToCartButton } from '@/components/add-to-cart'
import ReviewInput from '../_components/review-input'

interface Props {
  params: {
    productId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Collections', href: '/products' },
]

export default async function Page(props: Props) {
  const { params } = props

  const userId = await currentUserId()

  if (!userId) {
    return redirect('/')
  }

  const product = await db.products.findUnique({
    where: {
      id: params.productId,
    },
  })

  const category = await db.category.findUnique({
    where: {
      id: product?.categoryId,
    },
  })

  if (!product) {
    return redirect('/')
  }

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white space-y-3">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {category?.name}
                </div>

                <div className="ml-4 border-l font-medium text-gray-900 border-gray-300 pl-4">
                  {`Size ${product.size}`}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivery
                </p>
              </div>
            </section>
          </div>

          {/* product image */}
          <div className="group relative bg-muted aspect-square overflow-hidden rounded-xl">
            <div className="absolute z-10 inset-0 transition">
              <Image
                fill
                className="object-cover w-48 h-48"
                alt={product.name}
                // @ts-expect-error
                src={product.imageUrl}
              />
            </div>
          </div>

          {/* add to cart part */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 border-t">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Product Review
            </h1>
            <div className="w-full h-72 bg-black"></div>
            {/* @ts-ignore */}
            <ReviewInput params={params.productId} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
