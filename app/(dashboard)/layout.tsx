import { RoleGate } from '@/components/auth/role-gate'
import { Navbar } from './_component/Navbar'
import { Sidebar } from './_component/Sidebar'
import { UserRole } from '@prisma/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <RoleGate allowedRole={UserRole.ADMIN}>
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-56 pt-[80px] h-full">{children}</main>
      </RoleGate>
    </div>
  )
}
