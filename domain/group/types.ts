import { Prisma } from '@prisma/client'
import {
	GROUP_SELECT,
	GROUP_WITH_COUNT_SELECT,
} from '@/repositories/group/group.select'

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
	count: number
}
