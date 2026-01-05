import prisma from '@/lib/prisma'
import { Account } from '@/prisma/generated/client'
import { UserRole } from '@/prisma/generated/enums'
import { UserFilters } from '@/shared/lib/zod/account.schema'

export const userRepository = {
	async findAll(filters: UserFilters): Promise<Account[]> {
		return prisma.account.findMany({
			where: {
				AND: [
					filters.query
						? { username: { contains: filters.query, mode: 'insensitive' } }
						: {},
					filters.role && filters.role !== 'ALL'
						? { role: filters.role as UserRole }
						: {},
				],
			},
			orderBy: { createdAt: 'desc' },
		})
	},
	async delete(id: string) {
		return prisma.account.delete({ where: { id } })
	},
}
