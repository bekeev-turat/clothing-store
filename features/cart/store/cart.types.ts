import { Size } from "@/shared/types"

export interface CartItem {
	id: string
	slug: string
	title: string
	price: number
	image: string
	size: Size
	quantity: number
}
