'use server'

import { userRepository } from '@/repositories/admin/user.repository'
import { ROUTE_MAP } from '@/shared/config/routes'
import { ensureAdmin } from '@/shared/lib/auth-utils'
import { DeleteUserSchema } from '@/shared/lib/zod/account.schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function deleteUserAction(userId: string) {
	try {
		const session = await ensureAdmin()
		const validated = DeleteUserSchema.parse({ userId })

		// 3. Бизнес-логика: Защита от удаления самого себя
		if (session.user.id === validated.userId) {
			return {
				success: false,
				error: 'Вы не можете удалить собственную учетную запись',
			}
		}

		await userRepository.delete(validated.userId)

		revalidatePath(ROUTE_MAP.admin.users)

		return { success: true }
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : 'Произошла непредвиденная ошибка'
		console.error('[DELETE_USER_ACTION_ERROR]', error)

		if (error instanceof z.ZodError) {
			return { success: false, error: 'Некорректный ID пользователя' }
		}

		return {
			success: false,
			error: message,
		}
	}
}
