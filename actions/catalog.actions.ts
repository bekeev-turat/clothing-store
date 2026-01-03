'use server'

import { itemService } from '@/services/item.service'
import {
	CatalogParams,
	catalogParamsSchema,
} from '@/shared/lib/zod/catalog.schema'

export async function fetchCatalogProductsAction(rawParams: unknown) {
	try {
		const parsed = catalogParamsSchema.safeParse(rawParams)

		if (!parsed.success) {
			console.error('[CATALOG_PARAMS_VALIDATION_ERROR]', parsed.error)

			return {
				success: false as const,
				error: 'INVALID_PARAMS' as const,
				details: parsed.error.flatten().fieldErrors,
			}
		}

		const data = await itemService.search(parsed.data)

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

export async function getAdminProductsAction(filters: CatalogParams) {
	// Здесь в будущем можно добавить проверку прав (isAdmin)
	return await itemService.searchForAdmin(filters)
}
