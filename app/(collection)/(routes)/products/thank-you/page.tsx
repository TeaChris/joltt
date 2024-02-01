import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { currentUser } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (!user) {
    return redirect('/')
  }
  return (
    <MaxWidthWrapper className="my-10 sm:my-20">
      <div className="w-1/2 mx-auto space-y-3 flex flex-col items-center">
        <Image
          src={'/thank-you.png'}
          alt="thank-you image"
          width={250}
          height={250}
          className="object-cover"
        />
        <p className="text-xl font-semibold">
          Your order is now being processed for delivery
        </p>
      </div>
    </MaxWidthWrapper>
  )
}
