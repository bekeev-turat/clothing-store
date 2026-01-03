import { ItemSize } from '@prisma/client'
import {
	CatalogItem,
	PrismaCatalogItem,
	PrismaProductItem,
	PrismaProductListItem,
	ProductListItem,
	ProductWithVariants,
} from '@/domain/product/types'

export const mapItemToList = (
	item: PrismaProductListItem,
): ProductListItem => ({
	id: item.id,
	name: item.name,
	slug: item.slug,
	price: item.price,
	gender: item.gender,
	brand: item.brand,
	group: item.group,
	variants: item.variants.map((v) => ({
		id: v.id,
		color: v.color,
		images: v.images.map((img) => img.url),
	})),
})

export const mapItemToCatalog = (item: PrismaCatalogItem): CatalogItem => ({
	id: item.id,
	name: item.name,
	price: item.price,
	slug: item.slug,
	variant: item.variants[0]
		? {
				id: item.variants[0].id,
				color: item.variants[0].color,
				images: item.variants[0].images.map((img) => img.url),
		  }
		: null,
})

const emptyStock: Record<ItemSize, number> = {
	XS: 0,
	S: 0,
	M: 0,
	L: 0,
	XL: 0,
	XXL: 0,
	XXXL: 0,
}

export const mapItemToFull = (
	item: PrismaProductItem,
): ProductWithVariants => ({
	id: item.id,
	name: item.name,
	description: item.description,
	brand: item.brand,
	slug: item.slug,
	price: item.price,
	tags: item.tags,
	composition: item.composition,
	code: item.code,
	modelSize: item.modelSize,
	variants: item.variants.map((v) => ({
		id: v.id,
		color: v.color,
		availableSizes: v.availableSizes,
		images: v.images,
		stock: v.stock.reduce<Record<ItemSize, number>>(
			(acc, s) => {
				acc[s.size] = s.quantity
				return acc
			},
			{ ...emptyStock },
		),
	})),
})
