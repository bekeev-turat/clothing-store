import { z } from 'zod'

export const GroupWithCountSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
	gender: z.string(),
	slug: z.string(),
	_count: z.object({
		items: z.number(),
	}),
})

export type GroupWithCountDTO = z.infer<typeof GroupWithCountSchema>
