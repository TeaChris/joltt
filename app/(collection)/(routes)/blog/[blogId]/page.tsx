import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { blog } from '@/lib/data'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

import { lazy, Suspense } from 'react'

const LazyBlog = lazy(() => import('../_components/blog-id'))

import { Fira_Mono } from 'next/font/google'
import Link from 'next/link'

const font = Fira_Mono({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['greek'],
})

export default function Page({ params }: { params: { blogId: string } }) {
  const post = blog.find((blogPost) => blogPost.id === params.blogId)
  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <div className={cn('space-y-8 ', font.className)}>
          <Link
            href="/blog"
            className={buttonVariants({
              variant: 'ghost',
              className: 'text-xs text-neutral-500',
            })}
          >
            &larr; Back to Blog
          </Link>

          <div className="mt-8 space-y-6">
            <h6 className="text-sm text-neutral-500">{post?.date}</h6>
            <h1 className="font-bold text-3xl sm:text-4xl">{post?.title}</h1>
          </div>

          <div className="space-y-2 mt-20">
            <h6 className="text-sm text-neutral-500">Posted by</h6>
            <div className="flex items-center gap-2">
              <div className="w-10 aspect-square rounded-full border flex items-center justify-center">
                <User className="w-7 h-7" />
              </div>
              <div className="space-y-1 flex flex-col items-start">
                <small className="text-sm">Bermuda</small>
                <Link
                  href={''}
                  target="_blank"
                  className="text-xs text-neutral-500"
                >
                  @d_cipherer
                </Link>
              </div>
            </div>
          </div>

          <Separator />

          <Suspense fallback={<div>Loading</div>}>
            {/* @ts-ignore */}
            <LazyBlog post={post} />
          </Suspense>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
