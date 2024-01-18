'use client'

import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'

interface Props {
  children: React.ReactNode
  allowedRole: UserRole
}

export function RoleGate(props: Props) {
  const { children, allowedRole } = props

  const role = useCurrentRole()

  if (role !== allowedRole) {
    return redirect('/')
  }

  return <>{children}</>
}
