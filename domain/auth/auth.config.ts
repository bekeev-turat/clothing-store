import prisma from '@/lib/prisma'
import type { NextAuthOptions, DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { z } from 'zod'
import { UserRole } from '@/prisma/generated/enums'
import { ROUTE_MAP } from '@/shared/config/routes'

// 1. Расширяем типы сессии и пользователя
declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			username: string
			role: UserRole
			avatar?: string | null
		} & DefaultSession['user']
	}

	interface User {
		id: string
		username: string
		role: UserRole
		avatar?: string | null
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: {
			id: string
			email: string
			username: string
			role: UserRole
			avatar?: string | null
		}
	}
}

export const authConfig: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: ROUTE_MAP.auth.login,
		newUser: ROUTE_MAP.auth.register,
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 дней сессия
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// Записываем данные в токен один раз при логине
				token.user = {
					id: user.id,
					email: user.email!,
					username: user.username,
					role: user.role,
					avatar: user.avatar,
				}
			}
			return token
		},

		async session({ session, token }) {
			// Если токен существует, передаем данные пользователя в сессию
			if (token && token.user) {
				session.user = {
					...session.user,
					id: token.user.id,
					email: token.user.email,
					username: token.user.username,
					role: token.user.role,
					avatar: token.user.avatar,
				}
			}
			return session
		},
	},
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// Валидация входных данных
				const parsedCredentials = z
					.object({
						email: z
							.string()
							.email()
							.transform((val) => val.toLowerCase()),
						password: z.string().min(6),
					})
					.safeParse(credentials)

				if (!parsedCredentials.success) return null

				const { email, password } = parsedCredentials.data

				// Поиск пользователя
				const user = await prisma.account.findUnique({
					where: { email },
				})

				if (!user || !user.passwordHash) return null

				// Проверка пароля
				const isPasswordValid = await bcryptjs.compare(
					password,
					user.passwordHash,
				)
				if (!isPasswordValid) return null

				// Возвращаем объект пользователя (без пароля)
				return {
					id: user.id,
					email: user.email,
					username: user.username,
					role: user.role,
					avatar: user.avatar,
				}
			},
		}),
	],
}
