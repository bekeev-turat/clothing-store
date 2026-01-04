import { groupService } from '@/services/group.service'
import { GenderSchema } from '@/shared/lib/zod/gender.schema'

export async function getProductGroupOptionsAction() {
	return await groupService.getOptions()
}

export async function getProductGroupsWithCountAction(input?: unknown) {
	const parsed = GenderSchema.safeParse(input)

	return await groupService.getDetailedGroups(parsed.data)
}
