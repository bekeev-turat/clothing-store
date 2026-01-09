'use server'

import { AccountService } from '@/services/account.service'
import { ROUTE_MAP } from '@/shared/config/routes'
import { ensureAdmin } from '@/shared/lib/auth-utils'
import { ChangeRoleSchema } from '@/shared/lib/zod/account.schema'
import { revalidatePath } from 'next/cache'

export async function changeUserRoleAction(rawInput: unknown) {
	const validatedFields = ChangeRoleSchema.safeParse(rawInput)
	if (!validatedFields.success) {
		return {
			success: false,
			// Возвращаем первую ошибку или массив ошибок
			message:
				validatedFields.error.flatten().fieldErrors.role?.[0] ||
				'Некорректные данные',
		}
	}

	const { userId, role } = validatedFields.data

	try {
		const session = await ensureAdmin()

		if (session.user.id === userId) {
			return {
				success: false,
				error: 'Вы не можете изменить роль собственной учетной записи',
			}
		}
		await AccountService.changeRole(session.user.id, userId, role)

		revalidatePath(ROUTE_MAP.admin.users)
		return { success: true }
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'Произошла непредвиденная ошибка'
		console.error('[CHANGE_ROLE_ACTION]:', error)
		return { error: message }
	}
}
