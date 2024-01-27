import { currentRole, currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { ImageUpload } from '../_component/image-upload'
import { Banner } from '@/components/banner'
import { Actions } from '../_component/actions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { NameForm } from '../_component/name-form'

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

  const totalFields = required.length
  const completedFields = required.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const completed = required.every(Boolean)

  return (
    <div className="w-full flex flex-col space-y-12 pb-8">
      {!product.isPublished && (
        <div className="w-full h-[10%]">
          <Banner label="Unpublished Product: This product will not be visible to the customers in the shop page!" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/admin/product`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to product page
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Product Edit</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <Actions
                productId={productId}
                disabled={!completed}
                isPublished={product.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <h2 className="text-xl">Customize your product</h2>
              </div>
            </div>
            <NameForm data={product} id={params.productId} />
          </div>
        </div>
      </div>
    </div>
  )
}
