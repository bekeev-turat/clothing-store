import { CreateOrderInput } from '@/actions/order.schema'
import { ItemSize, OrderStatus } from '@/prisma/generated/enums'
import prisma from '@/lib/prisma'
import { stockRepository } from '@/repositories/stock.repository'
import { OrderRepository } from '@/repositories/order.repository'

export const orderService = {
	async createOrder(data: CreateOrderInput) {
		const totalAmount = data.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		)

		return prisma.$transaction(async (tx) => {
			for (const item of data.items) {
				const stock = await stockRepository.findByVariantAndSize(
					item.variantId,
					item.size as ItemSize,
					tx,
				)

				if (!stock || stock.quantity < item.quantity) {
					throw new Error(`Товара размера ${item.size} недостаточно в наличии`)
				}

				try {
					await stockRepository.updateQuantity(stock.id, -item.quantity, tx)
				} catch (e) {
					throw new Error(
						`Ошибка при резервировании товара ${item.size}. Возможно, его уже купили.`,
					)
				}
			}

			return OrderRepository.create(
				{
					user: { connect: { id: data.userId } },
					totalAmount,
					items: {
						create: data.items.map((item) => ({
							quantity: item.quantity,
							price: item.price,
							size: item.size as ItemSize, // ВАЖНО: сохраняем размер в OrderItem
							variant: { connect: { id: item.variantId } },
						})),
					},
					firstName: data.address.firstName,
					lastName: data.address.lastName,
					address: data.address.address,
					address2: data.address.address2,
					city: data.address.city,
					zip: data.address.zip,
					phone: data.address.phone,
				},
				tx,
			)
		})
	},
	async getOrderById(id: string) {
		const order = await OrderRepository.findById(id)
		if (!order) throw new Error('Заказ не найден')
		return order
	},
	async getOrderByUserId(userId: string) {
		const order = await OrderRepository.findByUserId(userId)
		if (!order) throw new Error('Заказы не найден')
		return order
	},

	async updateOrderStatus(id: string, status: OrderStatus) {
		// Здесь можно добавить логику уведомлений при смене статуса
		return OrderRepository.updateStatus(id, status)
	},
	async getOrdersList() {
		return OrderRepository.getAll()
	},
}
