'use client'

import { ExtendedUser } from '@/next-auth'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import { logOut } from '@/actions/sign-out'
import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'
import { useCurrentUserId } from '@/hooks/use-current-id'

interface Props {
  user?: ExtendedUser
}

export default function UserAccountNav(props: Props) {
  const { user } = props

  const role = useCurrentRole()

  const onClick = () => {
    logOut()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user?.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          {role === UserRole.ADMIN ? (
            <Link href={`/admin/product`}>Dashboard</Link>
          ) : (
            <Link href={`/dashboard`}>Dashboard</Link>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onClick} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
