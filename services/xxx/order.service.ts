import { Prisma } from '@/prisma/generated/client'
import { ItemSize } from '@/prisma/generated/enums'

interface OrderProduct {
	variantId: string
	size: ItemSize
	quantity: number
}

export class OrderService {
	async createOrder(userId: string, items: OrderProduct[]) {
		return await Prisma.$transaction(async (tx) => {
			let totalAmount = 0
			const orderItemsData = []

			for (const item of items) {
				// 1. Проверяем сток и блокируем строку для предотвращения Race Condition
				const stock = await tx.stock.findUnique({
					where: {
						variantId_size: { variantId: item.variantId, size: item.size },
					},
					include: { variant: { include: { item: true } } },
				})

				if (!stock || stock.quantity < item.quantity) {
					throw new Error(
						`Товар ${stock?.variant.item.name} в размере ${item.size} закончился`,
					)
				}

				// 2. Уменьшаем количество
				await tx.stock.update({
					where: { id: stock.id },
					data: { quantity: { decrement: item.quantity } },
				})

				// 3. Считаем сумму и готовим данные для OrderItem
				const price = stock.variant.item.price
				totalAmount += price * item.quantity

				orderItemsData.push({
					variantId: item.variantId,
					quantity: item.quantity,
					price: price, // Фиксируем цену на момент покупки
				})
			}

			// 4. Создаем заказ
			return await tx.order.create({
				data: {
					userId,
					totalAmount,
					status: 'PENDING',
					items: {
						create: orderItemsData,
					},
				},
				include: {
					items: true,
				},
			})
		})
	}
}
