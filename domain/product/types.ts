import { ItemSize, Prisma } from '@/prisma/generated/client'
import {
	CATALOG_ITEM_SELECT,
	PRODUCT_ITEM_SELECT,
	PRODUCT_LIST_SELECT,
} from '@/repositories/item.select'

// ProductList
export type PrismaProductList = Prisma.ItemGetPayload<{
	select: typeof PRODUCT_LIST_SELECT
}>
type ProductListVariant = Omit<
	PrismaProductList['variants'][number],
	'images'
> & {
	images: string[]
}

export type TransformedProductList = Omit<PrismaProductList, 'variants'> & {
	variants: ProductListVariant[]
}

// ProductCatalog
export type PrismaProductCatalog = Prisma.ItemGetPayload<{
	select: typeof CATALOG_ITEM_SELECT
}>
export type TransformedProductCatalog = Omit<
	PrismaProductCatalog,
	'variants'
> & {
	variant:
		| (Omit<PrismaProductCatalog['variants'][number], 'images'> & {
				images: string[]
		  })
		| null
}

// ProductItem
export type PrismaProductItem = Prisma.ItemGetPayload<{
	select: typeof PRODUCT_ITEM_SELECT
}>

type ProductItemVariant = Omit<
	PrismaProductItem['variants'][number],
	'stock'
> & {
	stock: Record<ItemSize, number>
}

export type TransformedProduct = Omit<PrismaProductItem, 'variants'> & {
	variants: ProductItemVariant[]
}
