import { useSession } from 'next-auth/react'

export const useCurrentUserId = () => {
  const session = useSession()

  return session.data?.user.id
}
