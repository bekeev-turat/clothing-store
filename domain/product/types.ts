import { ItemSize, Prisma } from '@/prisma/generated/client'
import { itemRepository } from '@/repositories/item.repository'
import {
	CATALOG_ITEM_SELECT,
	PRODUCT_ITEM_SELECT,
	PRODUCT_LIST_SELECT,
} from '@/repositories/item.select'

export interface ProductVariant {
	id: string
	color: string
	availableSizes: ItemSize[]
	images: { id: number; url: string }[]
	stock: Record<ItemSize, number>
}

export type ProductWithVariants = {
	id: string
	name: string
	description: string
	brand: string
	slug: string
	price: number
	tags: string[]
	composition: string[]
	code: string | null
	modelSize: ItemSize | null
	variants: ProductVariant[]
}

export interface ProductListItem {
	id: string
	name: string
	slug: string
	price: number
	brand: string
	gender: string
	group: {
		id: string
		title: string
	}
	variants: {
		id: string
		color: string
		images: string[]
	}[]
}

export interface CatalogItem {
	id: string
	name: string
	price: number
	slug: string
	variant: {
		id: string
		color: string
		images: string[]
	} | null
}

export type PrismaProductListItem = Prisma.ItemGetPayload<{
	select: typeof PRODUCT_LIST_SELECT
}>
export type PrismaProductItem = Prisma.ItemGetPayload<{
	select: typeof PRODUCT_ITEM_SELECT
}>
export type PrismaCatalogItem = Prisma.ItemGetPayload<{
	select: typeof CATALOG_ITEM_SELECT
}>
