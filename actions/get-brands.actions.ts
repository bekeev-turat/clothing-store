'use server'

import { itemService } from '@/services/item.service'

export async function getProductBrandsAction() {
	try {
		const data = await itemService.getUniqueBrands()

		return {
			success: true as const,
			data,
		}
	} catch (error) {
		console.error('[FETCH_CATALOG_PRODUCTS_ACTION_ERROR]', error)

		return {
			success: false as const,
			error: 'CATALOG_FETCH_FAILED' as const,
		}
	}
}
