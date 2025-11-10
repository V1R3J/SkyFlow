'use client'

import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/app/logo.svg'
import { navItems } from '@/constants/index'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import navbar from './assets/icons/nav-bar.svg'

interface Props {
  username: string
  avatar: string
  email: string
}

const Navbar = ({ username, avatar, email }: Props) => {
  const pathname = usePathname()

  return (
    <aside className="remove-scrollbar hidden md:flex h-screen w-[70px] sm:w-[90px] flex-col overflow-auto px-3 sm:px-5 py-7 lg:w-[280px] xl:w-[325px] bg-slate-100">
      <Link
        href="/"
        className="flex items-center gap-2 lg:gap-3 mb-8 justify-center lg:justify-start"
      >
        <Image src={logo} alt="Logo" width={100} height={60} className="hidden lg:block h-auto" />
        <Image src={logo} alt="Logo" width={48} height={48} className="block lg:hidden" />
        <span className="hidden lg:block text-2xl xl:text-4xl font-semibold text-black whitespace-nowrap">
          SkyFlow
        </span>
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-3 lg:gap-4">
          {navItems.map(({ url, name, icon: Icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  'sidebar-nav-item transition-all duration-200',
                  'h-14 lg:h-16',
                  'justify-center lg:justify-start',
                  pathname === url && 'shad-active'
                )}
              >
                <Icon
                  size={28}
                  className={cn(
                    'lg:w-7 lg:h-7 xl:w-8 xl:h-8 flex-shrink-0',
                    pathname === url ? 'text-white' : 'text-light-100 opacity-70'
                  )}
                />
                <p
                  className={cn(
                    'hidden lg:block text-base xl:text-lg font-medium',
                    'whitespace-nowrap'
                  )}
                >
                  {name}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image src="/assets/icons/nav-bar.svg" alt="Navbar icon" width={500} height={500} />
      <div className="sidebar-user-info group">
        <div className="relative">
          <Image
            src={avatar}
            alt="Avatar"
            width={44}
            height={44}
            className="sidebar-user-avatar ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all duration-200"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green rounded-full border-2 border-white"></div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:min-w-0 lg:flex-1">
          <p className="text-lg font-semibold capitalize text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {username}
          </p>
          <p className="text-sm text-gray-500 truncate group-hover:text-gray-700 transition-colors">
            {email}
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Navbar
