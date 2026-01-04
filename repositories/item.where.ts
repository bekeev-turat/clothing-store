import { CatalogParams } from '@/shared/lib/zod/catalog.schema'
import { Prisma } from '@/prisma/generated/client'

export function buildItemWhere(filters: CatalogParams): Prisma.ItemWhereInput {
	const {
		gender,
		groupSlug,
		minPrice,
		maxPrice,
		sizes,
		brands,
		hasZipper,
		search,
	} = filters

	const where: Prisma.ItemWhereInput = {}

	if (gender) {
		where.gender = gender
	}

	if (groupSlug) {
		where.group = {
			slug: groupSlug,
		}
	}

	if (search) {
		where.OR = [
			{ name: { contains: search, mode: 'insensitive' } },
			{ brand: { contains: search, mode: 'insensitive' } },
			{ tags: { has: search } },
		]
	}

	if (brands?.length) {
		where.brand = { in: brands }
	}

	if (minPrice !== undefined || maxPrice !== undefined) {
		where.price = {
			gte: minPrice,
			lte: maxPrice,
		}
	}

	if (sizes?.length) {
		where.variants = {
			some: {
				availableSizes: { hasSome: sizes },
			},
		}
	}

	if (hasZipper !== undefined) {
		where.hasZipper = hasZipper
	}

	return where
}
