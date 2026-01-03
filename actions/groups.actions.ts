import { itemService } from '@/services/item.service'
import { GenderSchema } from '@/shared/lib/zod/gender.schema'

export async function getProductGroupOptionsAction() {
	return await itemService.getGroupOptions()
}

export async function getProductGroupsWithCountAction(input?: unknown) {
	const parsed = GenderSchema.safeParse(input)

	return await itemService.getGroupsDetailed(parsed.data)
}
