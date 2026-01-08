import { ItemSize, OrderStatus } from '@/prisma/generated/enums'

export interface IAddress {
	firstName: string
	lastName: string
	address: string
	address2: string | null
	city: string
	zip: string
	phone: string
}

export interface IOrderItem {
	id: string
	quantity: number
	price: number
	size: ItemSize
	orderId: string
	variantId: string
}

export interface IOrder extends IAddress {
	id: string
	createdAt: Date | string
	updatedAt: Date | string
	status: OrderStatus
	totalAmount: number
	userId: string
	items: IOrderItem[]
}
