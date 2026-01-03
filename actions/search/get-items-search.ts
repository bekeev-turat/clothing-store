'use server'

import { ItemGender } from '@/prisma/generated/client'
import { itemService } from '@/services/item.service'

export async function searchItemsAction(formData: FormData) {
	const query = (formData.get('query') as string) || ''
	const gender = formData.get('gender') as string

	return await itemService.search({
		pageIndex: 1,
		pageSize: 20,
		search: query,
		gender: gender === 'all' ? undefined : (gender as ItemGender),
	})
}
