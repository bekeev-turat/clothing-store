import prisma from '@/lib/prisma'
import { Prisma, UserRole } from '@/prisma/generated/client'
import { UserFilters } from '@/shared/lib/zod/account.schema'

export const AccountRepository = {
	async findById(id: string) {
		return prisma.account.findUnique({ where: { id } })
	},

	async findByEmail(email: string) {
		return prisma.account.findUnique({ where: { email } })
	},

	async findAll(filters: UserFilters) {
		const skip = (filters.page - 1) * filters.limit

		return prisma.account.findMany({
			where: {
				AND: [
					filters.query
						? { username: { contains: filters.query, mode: 'insensitive' } }
						: {},
					filters.role !== 'ALL' ? { role: filters.role as UserRole } : {},
				],
			},
			orderBy: { [filters.sortBy]: filters.sortOrder },
			skip,
			take: filters.limit,
		})
	},
	async count(filters: UserFilters) {
		return prisma.account.count({
			where: {
				AND: [
					filters.query
						? { username: { contains: filters.query, mode: 'insensitive' } }
						: {},
					filters.role !== 'ALL' ? { role: filters.role as any } : {},
				],
			},
		})
	},

	async update(id: string, data: Prisma.AccountUpdateInput) {
		return prisma.account.update({
			where: { id },
			data,
		})
	},

	async create(data: {
		email: string
		username: string
		passwordHash: string
	}) {
		return prisma.account.create({
			data: {
				email: data.email,
				username: data.username,
				passwordHash: data.passwordHash,
				role: UserRole.MEMBER,
			},
		})
	},
}
