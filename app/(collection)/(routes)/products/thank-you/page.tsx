import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (!user) {
    return redirect('/')
  }
  return <div>Thank You!</div>
}
