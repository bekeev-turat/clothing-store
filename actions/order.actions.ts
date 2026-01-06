'use server'

import { revalidatePath } from 'next/cache'
import { CreateOrderSchema } from './order.schema'
import { ROUTE_MAP } from '@/shared/config/routes'
import { orderService } from '@/services/order.service'
import { OrderStatus } from '@/prisma/generated/enums'
import { getSessionOrThrow } from '@/shared/lib/auth-utils'
import { getStripe } from '@/shared/lib'
import { IOrder } from '@/domain/order/types'

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

		const line_items = validatedFields.data.items.map((item) => ({
			price_data: {
				currency: 'kgs',
				product_data: {
					name: `Заказ #${order.id}`,
				},
				unit_amount: Math.round(item.price * 100), // Stripe принимает в центах
			},
			quantity: item.quantity,
		}))

		const session = await getStripe().checkout.sessions.create({
			payment_method_types: ['card'],
			line_items,
			mode: 'payment',
			success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: process.env.STRIPE_CANCEL_URL,
			metadata: {
				orderId: order.id,
			},
		})

		revalidatePath(ROUTE_MAP.orders.root)

		return {
			success: true,
			orderId: order.id,
			url: session.url,
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
type ActionResult<T> =
	| { success: true; data: T }
	| { success: false; message: string }

export async function getOrdersByUserAction(): Promise<ActionResult<IOrder[]>> {
	try {
		const session = await getSessionOrThrow()

		const orders = await orderService.getOrderByUserId(session.user.id)
		return { success: true, data: orders }
	} catch {
		// const message = e instanceof Error ? e.message : 'Что-то пошло не так'

		return { success: false, message: 'Не удалось получить заказы' }
	}
}
