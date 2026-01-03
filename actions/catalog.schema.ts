import { ItemGender, ItemSize } from '@/prisma/generated/enums'
import { z } from 'zod'

export const catalogParamsSchema = z.object({
	 pageIndex: z.preprocess((val) => {
    if (!val) return 0;
    return Number(val);
  }, z.number().default(0)),
	// pageIndex: z.coerce.number().min(0).default(0),
	pageSize: z.coerce.number().min(1).max(100).default(12),
	gender: z.nativeEnum(ItemGender).optional(),
	groupId: z.string().optional(),
	minPrice: z.coerce.number().optional(),
	maxPrice: z.coerce.number().optional(),
	sizes: z.array(z.nativeEnum(ItemSize)).optional(),
	brands: z.array(z.string()).optional(),
	hasZipper: z.preprocess((val) => val === 'true', z.boolean()).optional(),
	search: z.string().optional(),
})

export type CatalogParams = z.infer<typeof catalogParamsSchema>
