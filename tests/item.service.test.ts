import { TransformedProductCatalog } from '@/domain/product/types'
import { itemRepository } from '@/repositories/item.repository'
import { itemService } from '@/services/item.service'
import { CatalogParams } from '@/shared/lib/zod/catalog.schema'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/repositories/item.repository')

const mockedRepo = vi.mocked(itemRepository)

describe('itemService.search', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('returns paginated catalog data', async () => {
		mockedRepo.findManyForCatalog.mockResolvedValue([
			{ id: '1' },
			{ id: '2' },
		] as TransformedProductCatalog[])
		mockedRepo.countForCatalog.mockResolvedValue(10)

		const result = await itemService.search({
			pageIndex: 1,
			pageSize: 2,
		} as CatalogParams)

		expect(result.data.length).toBe(2)
		expect(result.meta.totalItems).toBe(10)
		expect(result.meta.totalPages).toBe(5)
		expect(result.meta.hasNextPage).toBe(true)
	})

	it('returns empty result if no items', async () => {
		mockedRepo.findManyForCatalog.mockResolvedValue([])
		mockedRepo.countForCatalog.mockResolvedValue(0)

		const result = await itemService.search({
			pageIndex: 1,
			pageSize: 10,
		} as CatalogParams)

		expect(result.data).toEqual([])
		expect(result.meta.totalPages).toBe(0)
		expect(result.meta.hasNextPage).toBe(false)
	})
	it('should call repository with correct pagination and filters', async () => {
		const filters: CatalogParams = { pageIndex: 2, pageSize: 5, gender: 'male' }
		mockedRepo.findManyForCatalog.mockResolvedValue([])
		mockedRepo.countForCatalog.mockResolvedValue(0)

		await itemService.search(filters)

		expect(mockedRepo.findManyForCatalog).toHaveBeenCalledWith({
			skip: 5,
			take: 5,
			filters: filters,
		})
		expect(mockedRepo.countForCatalog).toHaveBeenCalledWith(filters)
	})
})
