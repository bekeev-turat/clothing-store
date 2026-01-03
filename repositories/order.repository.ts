import prisma from '@/lib/prisma'
import { OrderStatus, Prisma } from '@/prisma/generated/client'

type TxClient = Prisma.TransactionClient | typeof prisma

export const OrderRepository = {
	async create(data: Prisma.OrderCreateInput, tx?: TxClient) {
		const client = tx || prisma
		return client.order.create({
			data,
			include: { items: true },
		})
	},

	async findById(id: string) {
		return prisma.order.findUnique({
			where: { id },
			include: {
				items: {
					include: {
						variant: {
							include: { item: true },
						},
					},
				},
			},
		})
	},

	async updateStatus(id: string, status: OrderStatus, tx?: TxClient) {
		const client = tx || prisma
		return client.order.update({
			where: { id },
			data: { status },
		})
	},

	// Дополнительно: получение заказов пользователя
	async findByUserId(userId: string) {
		return prisma.order.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
			include: { items: true },
		})
	},
}
