import { currentUser } from '@/lib/auth'
import { ProductForm } from './_component/form'
import { redirect } from 'next/navigation'

export default async function AdmibDashboard() {
  const user = await currentUser()

  if (!user) {
    return redirect('/auth/sign-in')
  }

  return (
    <>
      <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="grid gap-6">
            <ProductForm />
          </div>
        </div>
      </div>
    </>
  )
}
