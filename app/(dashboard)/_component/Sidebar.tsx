import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="h-full border-r flex flex-col overflow-y-auto bg-white  shadow-sm">
      <div className="p-6 flex items-center gap-2 h-[80px] border-b border-b-neutral-200">
        <Link href="/" className="text-2xl font-extrabold text-primary">
          jolt.
        </Link>
      </div>
      <div className="flex flex-col w-full">
        {/* TODO: ADDED SIDEBAR ROUTES */}
      </div>
    </aside>
  )
}
