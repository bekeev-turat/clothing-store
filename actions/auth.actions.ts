'use server'

import { AuthService } from '@/services/auth.service'
import { RegisterSchema } from '@/shared/lib/zod/account.schema'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function registerAction(raw: unknown) {
	const parsed = RegisterSchema.safeParse(raw)

	if (!parsed.success) {
		return {
			success: false,
			error: 'Проверьте правильность заполнения полей',
			fields: parsed.error.flatten().fieldErrors,
		}
	}

	try {
		await AuthService.register(parsed.data)

		return {
			success: true,
			message: 'Регистрация успешно завершена',
		}
	} catch (error: unknown) {
		if (isRedirectError(error)) throw error

		console.error('[REGISTER_ACTION_ERROR]:', error)

		const errorMessage =
			error instanceof Error ? error.message : 'Произошла непредвиденная ошибка'

		return {
			success: false,
			error: errorMessage,
		}
	}
}
