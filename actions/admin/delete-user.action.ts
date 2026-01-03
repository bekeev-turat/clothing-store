'use server'
import { userRepository } from '@/repositories/admin/user.repository'
import { revalidatePath } from 'next/cache'

export async function deleteUserAction(userId: string) {
	try {
		await userRepository.delete(userId)
		revalidatePath('/admin/users')
		return { success: true }
	} catch {
		return { success: false, error: 'Ошибка при удалении' }
	}
}
