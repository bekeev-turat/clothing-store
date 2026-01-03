import NextAuth from 'next-auth'
import { authConfig } from '@/domain/auth/auth.config'

export const { signIn, signOut, handlers } = NextAuth(authConfig)
