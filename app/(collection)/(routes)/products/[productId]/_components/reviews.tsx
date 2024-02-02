import Image from 'next/image'

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
      {reviews ? (
        reviews.map((r) => (
          <article
            key={r.id}
            className="flex items-center w-full h-fit py-2 space-x-2"
          >
            <div className="w-12 aspect-square rounded-full">
              <Image
                src="/i5.png"
                alt="customer image"
                width={17}
                height={17}
                className="w-[90%] h-[90%] object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <h6 className="text-sm font-medium text-start">{r.review}</h6>
              <span></span>
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
