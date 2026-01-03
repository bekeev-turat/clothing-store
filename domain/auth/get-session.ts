import { getServerSession } from 'next-auth'
import { authConfig } from './auth.config'

export async function getSession() {
	return await getServerSession(authConfig)
}

// Хелпер, который сразу кидает ошибку или возвращает юзера
export async function getRequiredSession() {
	const session = await getSession()
	if (!session?.user) {
		throw new Error('Unauthorized')
	}
	return session
}
