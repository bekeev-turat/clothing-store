'use server'
import { signIn } from '@/auth'
import { AuthService } from '@/services/auth.service'
import { RegisterSchema } from './account.schema'
import { LoginSchema } from './auth.schema'


export async function registerAction(raw: unknown) {
	const parsed = RegisterSchema.safeParse(raw)
	if (!parsed.success) return { error: 'Некорректные данные' }

	await AuthService.register(parsed.data)
	return { success: true }
}

export async function loginAction(raw: unknown) {
	const parsed = LoginSchema.safeParse(raw)
	if (!parsed.success) return { error: 'Ошибка данных' }

	await signIn('credentials', {
		email: parsed.data.email,
		password: parsed.data.password,
		redirect: false,
	})

	return { success: true }
}
