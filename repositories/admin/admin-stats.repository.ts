import prisma from '@/lib/prisma'
import { OrderStatus } from '@/prisma/generated/enums'

export class AdminStatsRepository {
	static async getCounts() {
		const [items, users, groups] = await Promise.all([
			prisma.item.count(),
			prisma.account.count(),
			prisma.group.count(),
		])

		return { items, users, groups }
	}

	static async getMonthlyOrdersTotal(from: Date) {
		const orders = await prisma.order.findMany({
			where: {
				createdAt: { gte: from },
				status: 'PAID' as OrderStatus,
			},
			select: { totalAmount: true },
		})

		return orders.reduce((sum, o) => sum + o.totalAmount, 0)
	}
}
