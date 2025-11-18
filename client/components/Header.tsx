import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import FileUploader from '@/components/FileUploader'
import SearchCom from './SearchCom'
import { signOutUser } from '@/lib/actions/users.actions'
import { LogOutIcon } from 'lucide-react'

const Header = ({ userId, accountId }: { userId: string; accountId: string }) => {
  return (
    <header className="header">
      <SearchCom />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            'use server'

            await signOutUser()
          }}
        >
          <Button type="submit" className="sign-out-button">
            <LogOutIcon size={50} />
          </Button>
        </form>
      </div>
    </header>
  )
}
export default Header
