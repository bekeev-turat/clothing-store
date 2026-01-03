import { Size } from '@/shared/types'

export interface CartProduct {
	id: string
	slug: string
	title: string
	price: number
	quantity: number
	size: Size
	image: string
}
