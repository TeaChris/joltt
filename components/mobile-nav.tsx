'use client'

import { Menu, X } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { ExtendedUser } from '@/next-auth'
import { logOut } from '@/actions/sign-out'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'

const nav = [
  {
    label: 'Collections',
    href: '/products',
  },
  {
    label: 'Your orders',
    href: '/orders',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()
  const user = useCurrentUser()
  const role = useCurrentRole()

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  const onClick = () => {
    logOut()
  }

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    )

  return (
    <>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {nav.map((n) => (
                  <li key={n.href} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <Link
                          href={n.href}
                          onClick={() => closeOnCurrent(n.href)}
                          className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-2 text-base font-medium"
                        >
                          {n.label}
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
                {role === UserRole.ADMIN && (
                  <li className="space-y-10 px-4 pb-8 pt-10">
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <Link
                          onClick={() => closeOnCurrent('/admin/product')}
                          href="/admin/product"
                          className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-2 text-base font-medium"
                        >
                          Dashboard
                        </Link>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <>
              {!user ? (
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      onClick={() => closeOnCurrent('/sign-in')}
                      href="/sign-in"
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full -m-2 block',
                      })}
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      onClick={() => closeOnCurrent('/sign-up')}
                      href="/sign-up"
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full -m-2 block',
                      })}
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={onClick}
                  className={buttonVariants({
                    variant: 'outline',
                    className: 'w-full -m-2 block text-neutral-950',
                  })}
                >
                  Logout
                </Button>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  )
}
