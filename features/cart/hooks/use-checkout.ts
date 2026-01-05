'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/shared/store/hooks'
import { useCartActions } from '@/features/cart/hooks/use-cart-actions'
import {
	selectSubtotal,
	selectTax,
	selectTotalPrice,
} from '@/features/cart/store/cart.selectors'
import {
	ICartItem,
	IOrderAddress,
	IOrderTotals,
} from '@/features/cart/model/cart.types'

export const useCheckout = () => {
	const router = useRouter()
	const { items, address } = useAppSelector((state) => state.cart)
	const { handleCreateOrder } = useCartActions()

	const totals = {
		subTotal: useAppSelector(selectSubtotal),
		tax: useAppSelector(selectTax),
		total: useAppSelector(selectTotalPrice),
	}

	const onPlaceOrder = async () => {
		const result = await handleCreateOrder()
		if (result?.success) {
			router.push(`/orders/payment/${result.orderId}`)
		}
	}

	return {
		items: items as ICartItem[],
		address: address as IOrderAddress,
		totals: totals as IOrderTotals,
		isEmpty: items.length === 0,
		onPlaceOrder,
	}
}
