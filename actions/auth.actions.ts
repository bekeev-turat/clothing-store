'use server'

import { AuthService } from '@/services/auth.service'
import { RegisterSchema } from '@/shared/lib/zod/account.schema'

export async function registerAction(raw: unknown) {
	const parsed = RegisterSchema.safeParse(raw)
	if (!parsed.success) return { error: 'Некорректные данные' }

	await AuthService.register(parsed.data)
	return { success: true }
}
