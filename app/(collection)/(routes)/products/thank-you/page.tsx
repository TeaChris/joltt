import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (!user) {
    return redirect('/')
  }
  return (
    <MaxWidthWrapper className="mt-10 sm:mt-20">
      <div className="w-1/2 mx-auto space-y-4 flex flex-col items-center">
        <h1 className="text-3xl sm:text-6xl font-bold">Thank You!</h1>
        <p className="text-base font-semibold">
          Your order is now being processed for delivery
        </p>
      </div>
    </MaxWidthWrapper>
  )
}
