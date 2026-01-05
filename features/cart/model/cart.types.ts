import { Size } from '@/shared/types'

export interface ICartItem {
	id: string
	title: string
	price: number
	quantity: number
	image: string
	slug: string
	size: Size
}

export interface IOrderAddress {
	firstName?: string
	lastName?: string
	address?: string
	address2?: string
	city?: string
	zip?: string
	phone?: string
}

export interface IOrderTotals {
	subTotal: number
	tax: number
	total: number
}
