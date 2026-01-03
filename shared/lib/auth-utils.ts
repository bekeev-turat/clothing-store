import { getServerSession } from 'next-auth'
import { authConfig } from '@/domain/auth/auth.config'
import { UserRole } from '@prisma/client'

// Универсальная функция для получения сессии или выброса ошибки
export async function getSessionOrThrow() {
	const session = await getServerSession(authConfig)
	if (!session?.user?.id) {
		throw new Error('Вы не авторизованы')
	}
	return session
}

// Опционально: проверка на админа
export async function ensureAdmin() {
	const session = await getSessionOrThrow()
	if (session.user.role !== UserRole.ADMIN) {
		throw new Error('Доступ запрещен')
	}
	return session
}
