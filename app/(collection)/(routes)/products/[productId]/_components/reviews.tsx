import Image from 'next/image'

import { format } from 'date-fns'
import { User } from 'lucide-react'

interface Props {
  reviews: {
    id: string
    userId: string
    review: string
    productId: string
    createdAt: Date
    updatedAt: Date
  }[]
}

export function Review(props: Props) {
  const { reviews } = props
  return (
    <div className="w-full flex flex-col gap-3">
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <article
            key={r.id}
            className="flex items-center w-full h-fit py-2 space-x-2 border-b"
          >
            <div className="w-10 border-black aspect-square rounded-full border flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm font-medium text-start">{r.review}</h6>
              <span className="text-gray-500 text-xs">
                {format(new Date(r.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
          </article>
        ))
      ) : (
        <span className="text-sm font-medium">
          No review yet, be the first to post.
        </span>
      )}
    </div>
  )
}
