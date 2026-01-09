'use server'

import { itemService } from '@/services/item.service'
import { z } from 'zod'

export const getProductBySlugAction = async (slug: string) => {
	try {
		const validatedSlug = z.string().min(1).parse(slug)

		const item = await itemService.getItemBySlug(validatedSlug)

		if (!item) {
			return { error: 'Продукт не найден', data: null }
		}

		return { data: item, error: null }
	} catch (error) {
		console.error('[GET_PRODUCT_BY_SLUG_ERROR]:', error)
		return { error: 'Ошибка при загрузке продукта', data: null }
	}
}
