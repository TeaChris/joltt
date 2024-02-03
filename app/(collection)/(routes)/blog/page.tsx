import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { lazy, Suspense } from 'react'

const LazyBlog = lazy(() => import('./_components/blog'))

export default function Page() {
  return (
    <>
      <MaxWidthWrapper>
        <Suspense fallback={<div>Loading</div>}>
          <LazyBlog />
        </Suspense>
      </MaxWidthWrapper>
    </>
  )
}
