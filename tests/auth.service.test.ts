import { describe, expect, it, vi, beforeEach } from 'vitest'
import bcrypt from 'bcryptjs'
import { AuthService } from '@/services/auth.service'
import { AccountRepository } from '@/repositories/account.repository'
import { Account } from '@/prisma/generated/client'

vi.mock('@/repositories/account.repository')

vi.mock('bcryptjs')

const mockedRepo = vi.mocked(AccountRepository)
const mockedBcrypt = vi.mocked(bcrypt)

describe('AuthService', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('register', () => {
		it('throws error if user already exists', async () => {
			mockedRepo.findByEmail.mockResolvedValue({ email: '1' } as Account)

			await expect(
				AuthService.register({
					email: 'test@mail.com',
					username: 'test',
					password: '123456',
				}),
			).rejects.toThrow('Пользователь с таким email уже существует')
		})

		it('creates user with hashed password', async () => {
			mockedRepo.findByEmail.mockResolvedValue(null)
			mockedBcrypt.hash.mockResolvedValue('hashed-password' as never)
			mockedRepo.create.mockResolvedValue({
				id: '1',
				email: 'test@mail.com',
			} as Account)

			const result = await AuthService.register({
				email: 'test@mail.com',
				username: 'test',
				password: '123456',
			})

			expect(mockedBcrypt.hash).toHaveBeenCalledWith('123456', 10)
			expect(mockedRepo.create).toHaveBeenCalled()
			expect(result).toEqual({
				id: '1',
				email: 'test@mail.com',
			})
		})
	})

	describe('validateUser', () => {
		it('returns null if user not found', async () => {
			mockedRepo.findByEmail.mockResolvedValue(null)

			const result = await AuthService.validateUser('a@mail.com', '123')

			expect(result).toBeNull()
		})

		it('returns user if password is valid', async () => {
			const user = { passwordHash: 'hash' }
			mockedRepo.findByEmail.mockResolvedValue(user as Account)
			mockedBcrypt.compare.mockResolvedValue(true as never)

			const result = await AuthService.validateUser('a@mail.com', '123')

			expect(result).toBe(user)
		})
	})
})
