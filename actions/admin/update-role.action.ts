'use server'
import prisma from '@/lib/prisma'
import { UserRole } from '@/prisma/generated/enums'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, role: UserRole) {
	await prisma.account.update({
		where: { id: userId },
		data: { role: role },
	})
	revalidatePath('/admin/users')
}


