import prisma from '@/lib/prisma'
import { GenderDTO } from '@/shared/lib/zod/gender.schema'

export const groupRepository = {
	async findAll() {
		const groups = await prisma.group.findMany({
			select: { id: true, title: true, slug: true },
			orderBy: { title: 'asc' },
		})
		return groups
	},

	async findAllWithCount(gender: GenderDTO) {
		return await prisma.group.findMany({
			where: { gender: gender },
			include: {
				_count: {
					select: { items: true },
				},
			},
			orderBy: { title: 'asc' },
		})
	},

	async findBySlug(slug: string) {
		const group = prisma.group.findUnique({
			where: { slug },
			select: { id: true, title: true, slug: true },
		})
		return group
	},
}
