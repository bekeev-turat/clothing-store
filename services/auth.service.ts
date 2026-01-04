import { AccountRepository } from '@/repositories/account/account.repository'
import bcrypt from 'bcryptjs'

export class AuthService {
	private readonly users = new AccountRepository()

	async register(data: { email: string; username: string; password: string }) {
		const exists = await this.users.findByEmail(data.email)

		if (exists) {
			throw new Error('Пользователь с таким email уже существует')
		}

		const passwordHash = await bcrypt.hash(data.password, 10)

		const user = await this.users.create({
			email: data.email,
			username: data.username,
			passwordHash,
		})

		return {
			id: user.id,
			email: user.email,
		}
	}

	async validateUser(email: string, password: string) {
		const user = await this.users.findByEmail(email)

		if (!user) return null

		const isValid = await bcrypt.compare(password, user.passwordHash)

		if (!isValid) return null

		return user
	}
}
