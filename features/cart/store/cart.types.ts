import { Size } from '@/shared/interfaces'

export interface CartItem {
	id: string
	slug: string
	title: string
	price: number
	image: string
	size: Size
	quantity: number
}
