import { Prisma } from '@/prisma/generated/client'

export const CATALOG_ITEM_SELECT = {
	id: true,
	name: true,
	price: true,
	brand: true,
	slug: true,
	tags: true,
	variants: {
		take: 1,
		select: {
			id: true,
			color: true,
			images: {
				take: 2,
				select: { url: true },
			},
		},
	},
}

export const PRODUCT_LIST_SELECT = {
	id: true,
	name: true,
	slug: true,
	price: true,
	gender: true,
	brand: true,
	group: {
		select: {
			id: true,
			title: true,
		},
	},
	variants: {
		select: {
			id: true,
			color: true,
			images: {
				take: 2,
				select: { url: true },
			},
		},
	},
} satisfies Prisma.ItemSelect

export const PRODUCT_ITEM_SELECT = {
	id: true,
	name: true,
	slug: true,
	price: true,
	description: true,
	code: true,
	brand: true,
	composition: true,
	tags: true,
	modelSize: true,
	variants: {
		select: {
			id: true,
			color: true,
			availableSizes: true,
			images: { select: { id: true, url: true } },
			stock: {
				select: { size: true, quantity: true },
			},
		},
	},
} satisfies Prisma.ItemSelect
