'use server'

import { ensureAdmin, getSessionOrThrow } from '@/shared/lib/auth-utils'
import { AccountService } from '../services/account.service'
import { ChangeRoleSchema, UpdateProfileSchema } from './account.schema'

const service = new AccountService()

export async function updateProfileAction(rawFields: unknown) {
	try {
		// Одной строкой получаем пользователя или улетаем в catch
		const session = await getSessionOrThrow()

		const validatedFields = UpdateProfileSchema.safeParse(rawFields)
		if (!validatedFields.success) {
			return {
				error: 'Ошибка валидации',
				details: validatedFields.error.flatten().fieldErrors,
			}
		}

		const result = await service.updateProfile(
			session.user.id,
			validatedFields.data,
		)
		return { success: true, data: result }
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : 'Что-то пошло не так'
		return { error: message }
	}
}

export async function changeUserRoleAction(rawFields: unknown) {
	try {
		// Проверка на админа инкапсулирована
		const session = await ensureAdmin()

		const validatedFields = ChangeRoleSchema.safeParse(rawFields)
		if (!validatedFields.success) return { error: 'Некорректные данные' }

		const { targetUserId, role } = validatedFields.data
		await service.changeRole(session.user.id, targetUserId, role)
		return { success: true }
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : 'Что-то пошло не так'
		return { error: message }
	}
}

export async function getProfileAction() {
	try {
		const session = await getSessionOrThrow()
		const user = await service.getProfile(session.user.id)
		return { data: user, error: null }
	} catch (e: unknown) {
		const message =
			e instanceof Error ? e.message : 'Произошла ошибка при загрузке профиля'

		return { data: null, error: message }
	}
}
