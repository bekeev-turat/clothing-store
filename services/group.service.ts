import { groupRepository } from '@/repositories/group/group.repository'
import { GenderDTO } from '@/shared/lib/zod/gender.schema'
import { Prisma } from '@prisma/client'

export const groupService = {
	async getOptions() {
		const groups = await groupRepository.findAll()
		return groups
	},

	async getDetailedGroups(gender: GenderDTO) {
		const groups = await groupRepository.findAllWithCount(gender)
		return groups
	},
	async findBySlug(slug: string) {
		const groups = await groupRepository.findBySlug(slug)
		return groups
	},
}

export type IDetailedGroups = Prisma.PromiseReturnType<
	typeof groupService.getDetailedGroups
>

export type IDetailedGroupsItem = IDetailedGroups[number]
