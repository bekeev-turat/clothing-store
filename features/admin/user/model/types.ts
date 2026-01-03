import { UserRole } from '@/prisma/generated/client'

export interface UsersFilters {
	search?: string
	role?: UserRole | 'ALL'
}

export interface UserFilters {
	query?: string
	role?: string
}
