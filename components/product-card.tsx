import { formatPrice } from '@/lib/format-price'
import { Heart } from 'lucide-react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string
  name: string
  imageUrl: string | StaticImport
  price: number
}

export function ProductCard({ id, name, imageUrl, price }: Props) {
  return (
    <Link href={`/products/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full">
        <div className="relative w-full h-52 bg-muted flex items-center justify-center aspect-video rounded-md overflow-hidden">
          {/* @ts-ignore */}
          <Image
            fill
            className="object-cover"
            alt="product image"
            src={imageUrl}
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-secondary-foreground transition line-clamp-2">
              {name}
            </div>
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          </div>

          <div className="w-8 aspect-square border group-hover:border-secondary rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
