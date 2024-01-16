import { currentUser } from '@/lib/auth'
import { ProductForm } from './_component/form'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export default async function ProductPage() {
  const user = await currentUser()

  if (!user) {
    // || user.role !== 'ADMIN'
    return redirect('/auth/sign-in')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <>
      <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="grid gap-6">
            <ProductForm
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
        </div>
      </div>
    </>
  )
}
