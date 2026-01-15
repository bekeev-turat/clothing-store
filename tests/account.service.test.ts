import { describe, expect, it, vi } from 'vitest'
import { AccountRepository } from '@/repositories/account.repository'
import { UserRole } from '@/prisma/generated/enums'
import { AccountService } from '@/services/account.service'
import { TUserFiltersSchema } from '@/shared/lib/zod/account.schema'
import { Account } from '@/prisma/generated/client'

vi.mock('@/repositories/account.repository')

const mockedRepository = vi.mocked(AccountRepository)

describe('AccountService', () => {
	const defaultParams = {
		page: 1,
		limit: 10,
		role: 'ALL' as const,
		sortBy: 'createdAt' as const,
		sortOrder: 'asc' as const,
	}

	it('throws error if non-admin tries to get users', async () => {
		mockedRepository.findById.mockResolvedValue({
			role: UserRole.MEMBER,
		} as Account)

		await expect(
			AccountService.getAllUsers('1', defaultParams),
		).rejects.toThrow('Доступ запрещен')
	})

	it('returns users list for admin', async () => {
		mockedRepository.findById.mockResolvedValue({
			role: UserRole.ADMIN,
		} as Account)
		mockedRepository.findAll.mockResolvedValue([])
		mockedRepository.count.mockResolvedValue(0)

		const result = await AccountService.getAllUsers('1', defaultParams)

		expect(result.meta.total).toBe(0)
		expect(result.data).toEqual([])
	})
	it('should call repository with raw filters and check admin access', async () => {
		mockedRepository.findById.mockResolvedValue({
			role: UserRole.ADMIN,
		} as Account)
		mockedRepository.findAll.mockResolvedValue([])
		mockedRepository.count.mockResolvedValue(0)

		const filters: TUserFiltersSchema = {
			page: 2,
			limit: 5,
			role: 'MEMBER',
			sortBy: 'createdAt',
			sortOrder: 'asc',
		}

		await AccountService.getAllUsers('admin-id', filters)

		expect(mockedRepository.findById).toHaveBeenCalledWith('admin-id')
		expect(mockedRepository.findAll).toHaveBeenCalledWith(filters)
		expect(mockedRepository.count).toHaveBeenCalledWith(filters)
	})
})
