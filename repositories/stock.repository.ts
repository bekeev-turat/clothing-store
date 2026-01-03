import prisma from '@/lib/prisma'
import { Prisma } from '@/prisma/generated/client'
import { ItemSize } from '@/prisma/generated/enums'

type TxClient = Prisma.TransactionClient | typeof prisma

export const stockRepository = {
	async findByVariantAndSize(variantId: string, size: ItemSize, tx?: TxClient) {
		const client = tx || prisma
		return client.stock.findUnique({
			where: { variantId_size: { variantId, size } },
		})
	},

	async updateQuantity(id: string, delta: number, tx?: TxClient) {
		const client = tx || prisma
		return client.stock.update({
			where: {
				id,
				...(delta < 0 ? { quantity: { gte: Math.abs(delta) } } : {}),
			},
			data: { quantity: { increment: delta } },
		})
	},
}
