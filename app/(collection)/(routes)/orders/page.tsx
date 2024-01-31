import { DataTable } from '@/app/(dashboard)/(admin)/admin/products/_components/data-table'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { currentUser, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { columns } from './_components/columns'

export default async function Page() {
  const user = await currentUser()
  const userId = await currentUserId()

  if (!user) {
    return redirect('/')
  }

  const orders = await db.orders.findMany({
    where: {
      userId,
    },
    include: {
      orderItem: {
        include: {
          products: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <>
      <MaxWidthWrapper className="space-y-4 mt-8">
        <h1 className="text-black text-3xl sm:text-4xl font-bold">
          Your orders
        </h1>

        <DataTable data={orders} columns={columns} />
      </MaxWidthWrapper>
    </>
  )
}
