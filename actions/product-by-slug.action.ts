import { itemService } from '@/services/item.service'

export const getProductBySlugAction = async (slug: string) => {
	const item = await itemService.getItemBySlug(slug)

	if (!item) {
		throw new Error('Продукт не найден')
	}

	return item
}
