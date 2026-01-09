import {
	GROUP_SELECT,
	GROUP_WITH_COUNT_SELECT,
} from '@/repositories/group/group.select'
import { ItemGender } from '@/prisma/generated/enums'
import { Prisma } from '@/prisma/generated/client'

export type PrismaGroup = Prisma.GroupGetPayload<{
	select: typeof GROUP_SELECT
}>

export type PrismaGroupWithCount = Prisma.GroupGetPayload<{
	select: typeof GROUP_WITH_COUNT_SELECT
}>

export interface GroupOption {
	id: string
	title: string
}

export interface GroupWithCount extends GroupOption {
	slug: string
	gender: ItemGender | null
	_count: {
		items: number
	}
}
