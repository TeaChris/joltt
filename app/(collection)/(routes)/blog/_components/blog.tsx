import { buttonVariants } from '@/components/ui/button'

import { blog } from '@/lib'

import { User } from 'lucide-react'

import Link from 'next/link'

export default function Blog() {
  return (
    <div className="py-12">
      <div className="w-full grid grid-cols-1 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-y-8 lg:gap-x-6">
        {blog.map((b) => (
          <article
            key={b.id}
            className="w-full p-2 sm:w-80 border aspect-square rounded-lg space-y-4 sm:space-y-2"
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-sm text-neutral-500">{b.date}</span>
              <div className="w-7 aspect-square rounded-full border flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-xl font-bold">{b.title}</h2>
            <h2 className="text-sm text-start leading-4 font-medium">
              {b.subtitle}
            </h2>
            <div className="space-y-2 w-full pl-4">
              <ul className="space-y-1 text-sky-700 list-disc text-sm">
                <li>{b.features[1]}</li>
                <li>{b.features[2]}</li>
                <li>{b.features[3]}</li>
                <li>{b.features[4]}</li>
                <li>{b.features[5]}</li>
                <li>{b.features[6]}</li>
                <li>{b.features[7]}</li>
              </ul>
            </div>
            <Link
              href={`/blog/${b.id}`}
              className={buttonVariants({
                variant: 'outline',
                className: 'w-full',
              })}
            >
              Read more
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
