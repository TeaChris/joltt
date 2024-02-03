import { getProducts } from '@/actions/get-products'

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { Categories } from '@/components/categories'
import { ProductList } from '@/components/product-list'

import { Button, buttonVariants } from '@/components/ui/button'

import { db } from '@/lib/db'
import { currentUserId } from '@/lib/auth'

import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react'

import Link from 'next/link'

const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your order(s) delivered to your doorstep in few hours/days and have them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every product on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

interface Props {
  searchParams: { title: string; categoryId: string }
}

export default async function Home({ searchParams }: Props) {
  const userId = await currentUserId()
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  // @ts-ignore
  const products = await getProducts({ userId, ...searchParams })

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Collection
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Discover a world of style and convenience at{' '}
            <span className="text-primary font-bold">jolt.</span> where curated
            collections meet seamless shopping for an unparalleled online
            shopping experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/shop" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>

        {/* PRODUCT REELS */}
        <div className="space-y-3 pb-6">
          <div className="w-full flex items-center justify-center">
            <Categories items={categories} />
          </div>

          <ProductList
            items={products}
            title="Top picks for you"
            href="/products"
          />
        </div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-muted text-secondary-foreground">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
