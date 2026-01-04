import { Prisma } from '@/prisma/generated/client'
import { UserRole } from '@/prisma/generated/enums'
import { AccountRepository } from '@/repositories/account/account.repository'
import bcrypt from 'bcryptjs'

export class AccountService {
	private repo = new AccountRepository()

	async getProfile(id: string) {
		const user = await this.repo.findById(id)
		if (!user) throw new Error('Пользователь не найден')

		// Удаляем хеш пароля перед отправкой на фронт
		const { passwordHash, ...safeUser } = user
		return safeUser
	}

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

		return this.repo.update(id, updateData)
	}

	async getAllUsers(adminId: string) {
		const requester = await this.repo.findById(adminId)
		if (requester?.role !== UserRole.ADMIN) {
			throw new Error('Доступ запрещен: требуется роль администратора')
		}
		return this.repo.findAll()
	}

	async changeRole(adminId: string, targetUserId: string, newRole: UserRole) {
		const requester = await this.repo.findById(adminId)
		if (requester?.role !== UserRole.ADMIN) {
			throw new Error('Только админ может менять роли')
		}
		return this.repo.update(targetUserId, { role: newRole })
	}
}
