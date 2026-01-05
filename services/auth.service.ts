import { AccountRepository } from '@/repositories/account.repository'
import bcrypt from 'bcryptjs'

export const AuthService = {
	async register(data: { email: string; username: string; password: string }) {
		const exists = await AccountRepository.findByEmail(data.email)

		if (exists) {
			throw new Error('Пользователь с таким email уже существует')
		}

		const passwordHash = await bcrypt.hash(data.password, 10)

		const user = await AccountRepository.create({
			email: data.email,
			username: data.username,
			passwordHash,
		})

		return {
			id: user.id,
			email: user.email,
		}
	},

	async validateUser(email: string, password: string) {
		const user = await AccountRepository.findByEmail(email)

		if (!user) return null

		const isValid = await bcrypt.compare(password, user.passwordHash)

		if (!isValid) return null

		return user
	},
}
