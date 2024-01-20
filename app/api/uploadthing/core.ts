import { createUploadthing, type FileRouter } from 'uploadthing/next'

import { currentRole, currentUserId } from '@/lib/auth'
import { UserRole } from '@prisma/client'

const f = createUploadthing()

const auth = async () => {
  const userId = await currentUserId()
  const role = await currentRole()

  if (!userId || role !== UserRole.ADMIN) throw new Error('Unauthorized')
  return { userId }
}

export const ourFileRouter = {
  productImg: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)
    }),
} satisfies FileRouter

export type ourFileRouter = typeof ourFileRouter
