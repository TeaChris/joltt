import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'

export default function Page({ params }: { params: { blogId: string } }) {
  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <h1 className="font-bold text-3xl sm:text-4xl">Page in the making!</h1>
        <p className="text-neutral-500 text-sm">Please, check back tomorrow</p>
      </div>
    </MaxWidthWrapper>
  )
}
