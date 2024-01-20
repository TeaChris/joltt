import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { ImageUpload } from '../_component/image-upload'
import { Banner } from '@/components/banner'
import { Actions } from '../_component/actions'

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

  const required = [
    product.name,
    product.imageUrl,
    product.price,
    product.stock,
    product.size,
    product.description,
    product.categoryId,
  ]

  const completed = required.every(Boolean)

  return (
    <div className="w-full flex flex-col space-y-12 pb-8">
      {!product.isPublished && (
        <div className="w-full h-[10%]">
          <Banner label="Unpublished Product: This product will not be visible to the customers in the shop page!" />
        </div>
      )}
      <ImageUpload productId={productId} initialData={product} />
      <div className="w-full sm:w-[700px] mx-auto">
        <Actions
          productId={productId}
          disabled={!completed}
          isPublished={product.isPublished}
        />
      </div>
    </div>
  )
}
