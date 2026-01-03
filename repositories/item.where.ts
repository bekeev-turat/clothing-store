import { CatalogParams } from "@/actions/catalog/catalog.schema"
import { Prisma } from "@/prisma/generated/client"

export function buildItemWhere(filters: CatalogParams): Prisma.ItemWhereInput {
	const {
		gender,
		groupId,
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

	if (groupId) {
		where.groupId = groupId
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
