import prisma from '@/lib/prisma'
import { CatalogParams } from '@/shared/lib/zod/catalog.schema'
import type {
	TransformedProductCatalog,
	TransformedProductList,
	TransformedProduct,
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
	}): Promise<TransformedProductList[]> {
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
	}): Promise<TransformedProductCatalog[]> {
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

	async findBySlug(slug: string): Promise<TransformedProduct | null> {
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
	async getUniqueBrands(): Promise<string[] | null> {
		const brands = await prisma.item.findMany({
			select: { brand: true },
			distinct: ['brand'],
		})
		return brands.map((b) => b.brand).sort()
	},
}
