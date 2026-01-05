import { Prisma } from '@/prisma/generated/client'
import { UserRole } from '@/prisma/generated/enums'
import { AccountRepository } from '@/repositories/account.repository'
import { UserFilters } from '@/shared/lib/zod/account.schema'
import bcrypt from 'bcryptjs'

export const AccountService = {
	async getProfile(id: string) {
		const user = await AccountRepository.findById(id)
		if (!user) throw new Error('Пользователь не найден')

		// Удаляем хеш пароля перед отправкой на фронт
		const { passwordHash, ...safeUser } = user
		return safeUser
	},

	async updateProfile(
		id: string,
		data: { username?: string; avatar: string | null; password?: string },
	) {
		const updateData: Prisma.AccountUpdateInput = {}
		if (data.username) updateData.username = data.username
		if (data.avatar) updateData.avatar = data.avatar

		if (data.password) {
			updateData.passwordHash = await bcrypt.hash(data.password, 10)
		}

		return AccountRepository.update(id, updateData)
	},

	async getAllUsers(adminId: string, filters: UserFilters) {
		const requester = await AccountRepository.findById(adminId)
		if (requester?.role !== UserRole.ADMIN) {
			throw new Error('Доступ запрещен: требуется роль администратора')
		}
		const [users, total] = await Promise.all([
			AccountRepository.findAll(filters),
			AccountRepository.count(filters),
		])

		return {
			data: users,
			meta: {
				total,
				page: filters.page,
				limit: filters.limit,
				totalPages: Math.ceil(total / filters.limit),
			},
		}
	},
	async changeRole(adminId: string, targetUserId: string, newRole: UserRole) {
		const requester = await AccountRepository.findById(adminId)
		if (requester?.role !== UserRole.ADMIN) {
			throw new Error('Только админ может менять роли')
		}
		return AccountRepository.update(targetUserId, { role: newRole })
	},
}
