'use server'

import { groupService } from '@/services/group.service'
import { GenderSchema } from '@/shared/lib/zod/gender.schema'

/**
 * Получение опций для селектов и фильтров
 * Обернуто в try/catch, чтобы фронтенд не падал при ошибке БД
 */
export async function getProductGroupOptionsAction() {
	try {
		const options = await groupService.getOptions()
		return { success: true, data: options }
	} catch (error) {
		console.error('[GET_GROUP_OPTIONS_ERROR]:', error)
		return { success: false, error: 'Не удалось загрузить параметры групп' }
	}
}

/**
 * Получение групп с количеством товаров
 * С полной валидацией входных данных
 */
export async function getProductGroupsWithCountAction(input?: unknown) {
	try {
		const parsed = GenderSchema.safeParse(input)

		const gender = parsed.success ? parsed.data : undefined

		const groups = await groupService.getDetailedGroups(gender)

		return { success: true, data: groups }
	} catch (error) {
		console.error('[GET_GROUPS_WITH_COUNT_ERROR]:', error)
		return {
			success: false,
			error: 'Ошибка при получении детальной информации',
		}
	}
}
