import { OrderItem } from '@/prisma/generated/client'
import { ItemSize, OrderStatus } from '@/prisma/generated/enums'

export interface IOrderItem {
	id: string
	quantity: number
	price: number
	size: ItemSize
	variant: {
		id: string
		item: {
			id: string
			quantity: number
			price: number
			size: ItemSize
			orderId: string
			variantId: string
			createdAt: string
			status: OrderStatus
			totalAmount: number
		}
	}
}

export interface IOrder {
	id: string
	createdAt: Date | string
	status: OrderStatus
	totalAmount: number
	items: OrderItem[]
}
