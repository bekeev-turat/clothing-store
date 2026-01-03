import prisma from '@/lib/prisma'
import { CatalogParams } from '@/actions/catalog.schema'
import {
	CatalogItem,
	ProductListItem,
	ProductWithVariants,
} from '@/domain/product/types'
import { buildItemWhere } from './item.where'
import { mapItemToCatalog, mapItemToFull, mapItemToList } from './item.mapper'
import {
	CATALOG_ITEM_SELECT,
	PRODUCT_ITEM_SELECT,
	PRODUCT_LIST_SELECT,
} from './item.select'

export const itemRepository = {
	async findManyForAdmin({
		skip,
		take,
		filters,
	}: {
		skip: number
		take: number
		filters: CatalogParams
	}): Promise<ProductListItem[]> {
		const items = await prisma.item.findMany({
			where: buildItemWhere(filters),
			skip,
			take,
			select: PRODUCT_LIST_SELECT,
			orderBy: { createdAt: 'desc' },
		})

		return items.map(mapItemToList)
	},

	async findManyForCatalog({
		skip,
		take,
		filters,
	}: {
		skip: number
		take: number
		filters: CatalogParams
	}): Promise<CatalogItem[]> {
		const items = await prisma.item.findMany({
			where: buildItemWhere(filters),
			skip,
			take,
			select: CATALOG_ITEM_SELECT,
			orderBy: { createdAt: 'desc' },
		})

		return items.map(mapItemToCatalog)
	},
	async countForCatalog(filters: CatalogParams): Promise<number> {
		return prisma.item.count({
			where: buildItemWhere(filters),
		})
	},

	async findBySlug(slug: string): Promise<ProductWithVariants | null> {
		const item = await prisma.item.findUnique({
			where: { slug },
			select: PRODUCT_ITEM_SELECT,
		})

		if (!item) return null

		return mapItemToFull(item)
	},

	async count(filters: CatalogParams): Promise<number> {
		return prisma.item.count({
			where: buildItemWhere(filters),
		})
	},

	async getGroupOptions() {
		return prisma.group.findMany({
			select: { id: true, title: true },
			orderBy: { title: 'asc' },
		})
	},
	async getGroupsWithCount() {
		return await prisma.group.findMany({
			include: {
				_count: {
					select: { items: true },
				},
			},
			orderBy: { title: 'asc' },
		})
	},
}
