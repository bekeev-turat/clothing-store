'use server'

import { revalidatePath } from 'next/cache'
import { CreateOrderSchema } from './order.schema'
import { ROUTE_MAP } from '@/shared/config/routes'
import { orderService } from '@/services/order.service'
import { OrderStatus } from '@/prisma/generated/enums'
import { OrderRepository } from '@/repositories/order.repository'
import { getSessionOrThrow } from '@/shared/lib/auth-utils'

export async function createOrderAction(rawData: unknown) {
	const validatedFields = CreateOrderSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			success: false,
			message: 'Ошибка валидации данных',
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	try {
		const order = await orderService.createOrder(validatedFields.data)

		revalidatePath(ROUTE_MAP.orders.root)

		return {
			success: true,
			orderId: order.id,
			message: 'Заказ успешно создан',
		}
	} catch (error: unknown) {
		console.error('[CREATE_ORDER_ERROR]:', error)

		const message =
			error instanceof Error ? error.message : 'Не удалось создать заказ'
		return {
			success: false,
			message: message,
		}
	}
}

/**
 * Action для получения одного заказа
 */
export async function getOrderByIdAction(id: string) {
	try {
		const order = await orderService.getOrderById(id)
		return { success: true, data: order }
	} catch (e) {
		return { success: false, message: 'Заказ не найден' }
	}
}

/**
 * Action для смены статуса (например, для админки)
 */
export async function updateOrderStatusAction(
	orderId: string,
	status: OrderStatus,
) {
	try {
		await orderService.updateOrderStatus(orderId, status)

		// Обновляем пути, где отображается этот заказ
		revalidatePath(ROUTE_MAP.orders.root)
		revalidatePath(ROUTE_MAP.orders.detail(orderId))

		return { success: true, message: 'Статус обновлен' }
	} catch (e) {
		return { success: false, message: 'Ошибка при обновлении статуса' }
	}
}
export async function getOrdersByUserAction() {
	try {
		const session = await getSessionOrThrow()

		const orders = await OrderRepository.findByUserId(session.user.id)
		return { success: true, data: orders }
	} catch (e) {
		return { success: false, message: 'Не удалось загрузить заказы' }
	}
}
