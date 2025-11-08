"use server"

import { Account, Avatars, Client, Databases, Storage } from 'node-appwrite'
import { appwriteConfig } from './config'
import { cookies } from 'next/headers'

// Create and configure client instance

// 1. Create a session client
export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)

  const session = (await cookies()).get('appwrite-session')

  if (!session || !session.value) throw new Error('No session cookie found')
  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    },
  };
};

//2. Create an Admin client
export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secrectKey)

  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    },
    get storage() {
      return new Storage(client)
    },
    get avatars() {
      return new Avatars(client)
    }
  };
}
