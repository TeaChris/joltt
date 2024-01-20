import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { ImageUpload } from '../_component/image-upload'

export default async function Page({
  params,
}: {
  params: { productId: string }
}) {
  const { productId } = params

  const userId = await currentUserId()
  const role = await currentRole()

  if (!userId || role !== UserRole.ADMIN) {
    return redirect('/')
  }

  const product = await db.products.findUnique({
    where: {
      id: productId,
      userId,
    },
  })

  if (!product) {
    return redirect('/')
  }

  return <ImageUpload productId={productId} initialData={product} />
}
