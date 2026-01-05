import { Prisma } from "@/prisma/generated/client"

export const GROUP_SELECT = {
	id: true,
	title: true,
	slug: true,
} satisfies Prisma.GroupSelect

export const GROUP_WITH_COUNT_SELECT = {
	...GROUP_SELECT,
	_count: {
		select: { items: true },
	},
} satisfies Prisma.GroupSelect
