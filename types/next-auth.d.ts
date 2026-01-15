import { UserRole } from '@/prisma/generated/enums'

declare module 'next-auth' {
	interface User {
		id: string
		email: string
		username: string
		role: UserRole
		avatar?: string | null
	}

	interface Session {
		user: User
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
