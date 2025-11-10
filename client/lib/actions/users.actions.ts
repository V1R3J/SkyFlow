'use server'
// ** Create Account Flow **
// 1. User enters name and email
// 2. Check if the user already exists using the email
// 3. Send OTP to users email
// 4. This will create a session for the user
// 5. Create a new account if the users is new
// 6. Return the account id
// 7. User is signed in

import { createAdminClient, createSessionClient } from '../appwrite'
import { appwriteConfig } from '../appwrite/config'
import { Query, ID } from 'node-appwrite'
import { parseStringify } from '../utils'
import { cookies } from 'next/headers'
import { avatarPlaceholderUrl } from '@/constants'
import { redirect } from 'next/navigation'

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient()
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal('email', [email])]
  )
  return result.total > 0 ? result.documents[0] : null
}

const handleError = (error: unknown, message: string) => {
  console.log(error, message)
  throw error
}

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient()
  try {
    const session = await account.createEmailToken(ID.unique(), email)
    return session.userId
  } catch (error) {
    handleError(error, 'Failed to send email OTP')
  }
}

export const createAccount = async ({ username, email }: { username: string; email: string }) => {
  const existingUser = await getUserByEmail(email)
  const accountId = await sendEmailOTP({ email })
  if (!accountId) throw new Error('Failed to send OTP')

  if (!existingUser) {
    const { databases } = await createAdminClient()

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        username,
        email,
        avatar: avatarPlaceholderUrl,
        accountId,
      }
    )
  }

  return parseStringify({ accountId })
}

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string
  password: string
}) => {
  try {
    const { account } = await createAdminClient()

    // ✅ FIXED: Use createSession with the OTP (password is the OTP code)
    // For email token verification in Appwrite, createSession works with userId and secret
    const session = await account.createSession(accountId, password)

    ;(await cookies()).set('appwrite-session', session.secret, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    return parseStringify({ sessionId: session.$id })
  } catch (error) {
    handleError(error, 'Failed to verify OTP')
  }
}

// Get current User info
export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient()

    const result = await account.get()

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', result.$id)]
    )

    if (user.total <= 0) return null

    return parseStringify(user.documents[0])
  } catch (error) {
    console.log(error)
  }
}

//Sign out method
export const signOutUser = async () => {
  const { account } = await createSessionClient()

  try {
    //Delete the current Session
    await account.deleteSession('current')
    ;(await cookies()).delete('appwrite-session')
  } catch (error) {
    handleError(error, 'Failed to sign out')
  } finally {
    redirect('/sign-in')
  }
}
