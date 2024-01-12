import Link from 'next/link'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { Cart } from './Cart'

const nav = [
  {
    label: 'Shop',
    href: '/shop',
  },
]

export function Navbar() {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO: ADD MOBILE NAV */}
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
                  {/* TODO: ADD USER-ACCOUNT-NAV */}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}