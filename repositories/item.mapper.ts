import type {
	PrismaProductCatalog,
	PrismaProductItem,
	PrismaProductList,
	TransformedProductList,
	TransformedProduct,
	TransformedProductCatalog,
} from '@/domain/product/types'
import { ItemSize } from '@/prisma/generated/enums'

export const mapItemToList = (
	item: PrismaProductList,
): TransformedProductList => ({
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

export const mapItemToCatalog = (
	item: PrismaProductCatalog,
): TransformedProductCatalog => ({
	id: item.id,
	name: item.name,
	price: item.price,
	slug: item.slug,
	brand: item.brand,
	tags: item.tags,
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

export const mapItemToFull = (item: PrismaProductItem): TransformedProduct => {
	const { variants, ...rest } = item 

	return {
		...rest, 
		variants: variants.map((v) => ({
			...v,
			stock: v.stock.reduce<Record<ItemSize, number>>(
				(acc, s) => {
					acc[s.size] = s.quantity
					return acc
				},
				{ ...emptyStock },
			),
		})),
	}
}
