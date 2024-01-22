'use client'

import {
  AppWindow,
  BarChart,
  BringToFront,
  Compass,
  PlusCircle,
  Settings,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './SidebarItem'

const adminRoutes = [
  {
    icon: PlusCircle,
    label: 'New Product',
    href: '/admin/product',
  },
  {
    icon: BringToFront,
    label: 'Products',
    href: '/admin/products',
  },
  {
    icon: AppWindow,
    label: 'Earning',
    href: '/admin/earning',
  },
  {
    icon: Compass,
    label: 'Orders',
    href: '/admin/orders',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/admin/settings',
  },
]

const userRoutes = [
  {
    icon: BarChart,
    label: 'Dashboard',
    href: '/user/dashboard',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/user/orders',
  },
]

export function SidebarRoutes() {
  const pathname = usePathname()

  const isAdminRoutes = pathname?.includes('/admin')

  const routes = isAdminRoutes ? adminRoutes : userRoutes

  return (
    <div className="w-full flex flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
