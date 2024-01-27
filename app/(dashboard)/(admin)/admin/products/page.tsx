import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

export default async function Page() {
  const userId = await currentUserId()
  const role = await currentRole()

  if (!userId || role !== UserRole.ADMIN) {
    return redirect('/')
  }

  const product = await db.products.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="lg:p-6">
      <DataTable columns={columns} data={product} />
    </div>
  )
}
