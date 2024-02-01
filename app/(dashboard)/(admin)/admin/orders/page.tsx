import { DataTable } from '@/components/data-table'
import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { columns } from './_components/columns'

export default async function Page() {
  const userId = await currentUserId()
  const role = await currentRole()

  if (!userId || role !== UserRole.ADMIN) {
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
    <div className="lg:p-6 space-x-4">
      <h1 className="text-black text-3xl sm:text-4xl font-bold">All orders</h1>
      <DataTable data={orders} columns={columns} />
    </div>
  )
}
