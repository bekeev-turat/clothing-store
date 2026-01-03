import { CatalogParams } from '@/shared/lib/zod/catalog.schema'
import { buildPagination } from '@/domain/catalog/pagination'
import { PaginatedResponse } from '@/domain/common/paginated-response'
import {
	CatalogItem,
	ProductListItem,
	ProductWithVariants,
} from '@/domain/product/types'
import { itemRepository } from '@/repositories/item.repository'
import { GenderDTO } from '@/shared/lib/zod/gender.schema'

export const itemService = {
	async search(
		filters: CatalogParams,
	): Promise<PaginatedResponse<CatalogItem>> {
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
	): Promise<PaginatedResponse<ProductListItem>> {
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
	async getItemBySlug(slug: string): Promise<ProductWithVariants | null> {
		const item = await itemRepository.findBySlug(slug)

		if (!item) return null
		return item
	},

	async getGroupOptions() {
		return {
			groups: await itemRepository.getGroupOptions(),
		}
	},
	async getGroupsDetailed(gender: GenderDTO) {
		return await itemRepository.getGroupsWithCount(gender)
	},
}
