'use client'

import { toast } from 'sonner'

import { UploadDropzone } from '@/lib/uploadthing'
import { ourFileRouter } from '@/app/api/uploadthing/core'

interface FileUploadProps {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter
}

export default function FileUpload({ onChange, endpoint }: FileUploadProps) {
  return (
    <UploadDropzone
      // endpoint={endpoint}
      endpoint="productImg" // you can as well do endpoint={endpoint} if you have multifple endpoints you want to target
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`)
      }}
      appearance={{
        button({ ready, isUploading }) {
          return {
            ...(ready && { color: '240 5.9% 10%' }),
          }
        },
      }}
    />
  )
}
