"use client"

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import logo from '@/app/logo.svg'
import { usePathname } from 'next/navigation'
import { LogOutIcon, Menu } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import { navItems } from '@/constants'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import FileUploader from './FileUploader'
import { signOutUser } from '@/lib/actions/users.actions'

interface Props {
  ownerId: string
  accountId: string
  username: string
  avatar: string
  email: string
}

const MobileNavigation = ({ ownerId, accountId, username, avatar, email }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="mobile-header">
      <Image src={logo} alt="Logo" width={100} height={45} className="h-auto" />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu size={40} className="text-gray-500" />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={50}
                height={50}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="capitalize subtitle-2">{username}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon: Icon }) => (
                <Link key={name} href={url} className="w-full">
                  <li className={cn('mobile-nav-item', pathname === url && 'shad-active')}>
                    <Icon
                      size={28}
                      className={cn(
                        'lg:w-7 lg:h-7 xl:w-8 xl:h-8 flex-shrink-0',
                        pathname === url ? 'text-white' : 'text-light-100 opacity-70'
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <LogOutIcon size={24} />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNavigation
