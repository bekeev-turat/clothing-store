import prisma from '@/lib/prisma'

export async function fetchAdminProducts() {
	return prisma.item.findMany({
		include: { group: true, variants: { include: { images: true } } },
		orderBy: { createdAt: 'desc' },
	})
}
