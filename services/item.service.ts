import { CatalogParams } from '@/shared/lib/zod/catalog.schema'
import { buildPagination } from '@/domain/catalog/pagination'
import type { PaginatedResponse } from '@/domain/common/paginated-response'
import type {
	TransformedProductCatalog,
	TransformedProductList,
	TransformedProduct,
} from '@/domain/product/types'
import { itemRepository } from '@/repositories/item.repository'

export const itemService = {
	async search(
		filters: CatalogParams,
	): Promise<PaginatedResponse<TransformedProductCatalog>> {
		const pagination = buildPagination(filters.pageIndex, filters.pageSize)

		const [items, total] = await Promise.all([
			itemRepository.findManyForCatalog({
				skip: pagination.offset,
				take: pagination.limit,
				filters,
			}),
			itemRepository.countForCatalog(filters),
		])

		const totalPages = Math.ceil(total / pagination.limit)

		return {
			data: items,
			meta: {
				totalItems: total,
				totalPages,
				currentPage: pagination.page,
				pageSize: pagination.limit,
				hasNextPage: pagination.page < totalPages,
				hasPreviousPage: pagination.page > 1,
			},
		}
	},
	async searchForAdmin(
		filters: CatalogParams,
	): Promise<PaginatedResponse<TransformedProductList>> {
		const pagination = buildPagination(filters.pageIndex, filters.pageSize)

		const [items, total] = await Promise.all([
			itemRepository.findManyForAdmin({
				skip: pagination.offset,
				take: pagination.limit,
				filters,
			}),
			itemRepository.countForCatalog(filters),
		])

		const totalPages = Math.ceil(total / pagination.limit)

		return {
			data: items,
			meta: {
				totalItems: total,
				totalPages,
				currentPage: pagination.page,
				pageSize: pagination.limit,
				hasNextPage: pagination.page < totalPages,
				hasPreviousPage: pagination.page > 1,
			},
		}
	},
	async getItemBySlug(slug: string): Promise<TransformedProduct | null> {
		const item = await itemRepository.findBySlug(slug)

		if (!item) return null
		return item
	},
	async getUniqueBrands(): Promise<string[] | null> {
		const brands = await itemRepository.getUniqueBrands()

		if (!brands) return null
		return brands
	},
}
