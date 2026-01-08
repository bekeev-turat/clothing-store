import { getStripe } from '@/shared/lib'
import { IOrder } from '@/domain/order/types'

export const paymentService = {
	/**
	 * Создает сессию оформления заказа Stripe для существующего заказа.
	 */
	async createCheckoutSession(order: IOrder) {
		const stripe = getStripe()

		const line_items = order.items.map((item) => ({
			price_data: {
				currency: 'kgs',
				product_data: {
					name: `Заказ #${order.id}`,
				},
				unit_amount: Math.round(item.price * 100),
			},
			quantity: item.quantity,
		}))

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items,
			mode: 'payment',
			success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: process.env.STRIPE_CANCEL_URL,
			metadata: {
				orderId: order.id,
			},
		})

		return session.url
	},
}
