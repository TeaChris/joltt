import { auth } from '@/auth'

export default async function Page() {
  const session = await auth()

  return <div></div>
}
