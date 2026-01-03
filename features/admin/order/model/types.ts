import {
	Account,
	Item,
	Order,
	OrderItem,
	ItemVariant,
} from '@/prisma/generated/client'

export type ExtendedOrder = Order & {
	user: Account
	items: (OrderItem & {
		variant: ItemVariant & {
			item: Item
		}
	})[]
}
