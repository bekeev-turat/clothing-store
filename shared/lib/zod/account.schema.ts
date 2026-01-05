import { z } from 'zod'

export const UserFiltersSchema = z.object({
	query: z.string().optional(),
	role: z.enum(['ALL', 'ADMIN', 'USER']).default('ALL'),
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().min(1).max(100).default(10),
	sortBy: z.enum(['createdAt', 'username']).default('createdAt'),
	sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export type UserFilters = z.infer<typeof UserFiltersSchema>
