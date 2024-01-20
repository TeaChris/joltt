'use client'

import { ConfirmModal } from '@/components/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

import { toast } from 'sonner'

interface ActionsProps {
  disabled: boolean
  productId: string
  isPublished: boolean
}

export default function Actions({
  disabled,
  productId,
  isPublished,
}: ActionsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(`/api/products/${productId}/unpublish`)
        toast.success('Your product was unpublished')
      } else {
        await axios.patch(`/api/products/${productId}/publish`)
        toast.success('Your product was successfully published')
      }

      router.refresh()
    } catch {
      toast.error('Something went wrong, please try again')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/products/${productId}`)

      toast.success('Your product was deleted successfully')
      router.refresh()
      router.push(`/admin/product`)
    } catch {
      toast.error('Something went wrong, please try again')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={'outline'}
        size={'sm'}
      >
        {isPublished ? 'Unpublished' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </ConfirmModal>
    </div>
  )
}
