import { ItemGender, ItemSize } from '@/prisma/generated/enums'
import { z } from 'zod'

const commaArray = z.preprocess((val) => {
	if (typeof val === 'string') return val.split(',')
	return val
}, z.array(z.string()))

export const catalogParamsSchema = z.object({
	pageIndex: z.preprocess((val) => {
		if (!val) return 0
		return Number(val)
	}, z.number().default(0)),
	pageSize: z.coerce.number().min(1).max(100).default(12),
	gender: z.nativeEnum(ItemGender).optional(),
	groupSlug: z.string().optional(),
	minPrice: z.coerce.number().optional(),
	maxPrice: z.coerce.number().optional(),
	brands: commaArray.optional(),

	sizes: z
		.preprocess((val) => {
			if (typeof val === 'string') return val.split(',')
			return val
		}, z.array(z.nativeEnum(ItemSize)))
		.optional(),

	hasZipper: z.preprocess((val) => val === 'true', z.boolean()).optional(),
	search: z.string().optional(),
})

export type CatalogParams = z.infer<typeof catalogParamsSchema>
