import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  icon: LucideIcon
  label: string
  href: string
}

export function SidebarItem(props: Props) {
  const { icon: Icon, label, href } = props

  const pathname = usePathname()
  const router = useRouter()

  const isActive =
    (pathname === '/admin/product' && href === '/admin/product') ||
    pathname === href ||
    pathname?.startsWith(`${href}/admin/product`)

  const onClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 text-primary text-sm font-[500] pl-6 transition-all hover:text-primary hover:bg-slate-300/20',
        isActive && 'bg-muted hover:text-primary'
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn('text-[#8C94A3]', isActive && 'text-muted-foreground')}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-primary h-full transition-all',
          isActive && 'opacity-100'
        )}
      />
    </button>
  )
}
