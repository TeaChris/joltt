import Link from 'next/link'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { Cart } from './Cart'
import UserAccountNav from './UserAccountNav'
import { currentUser } from '@/lib/auth'
import { MobileNav } from './mobile-nav'

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

export async function Navbar() {
  const user = await currentUser()
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0">
                <Link href="/" className="text-2xl font-extrabold text-primary">
                  jolt.
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <div className="flex gap-4 h-full items-center">
                  {nav.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={buttonVariants({
                        variant: 'ghost',
                      })}
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/auth/sign-in"
                      className={buttonVariants({
                        variant: 'ghost',
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <>
                      <UserAccountNav user={user} />
                    </>
                  ) : (
                    <Link
                      href="/auth/sign-up"
                      className={buttonVariants({
                        variant: 'ghost',
                      })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>

                <div className="lg:hidden flex flex-1 justify-end">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}
