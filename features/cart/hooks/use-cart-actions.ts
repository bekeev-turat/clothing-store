'use client'

import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { removeItem, updateItemQuantity, clearCart } from '../store/cart.slice'
import { createOrderAction } from '@/actions/order.actions'
import { useSession } from 'next-auth/react' // Для клиента используем это

export const useCartActions = () => {
	const dispatch = useAppDispatch()
	const { data: session } = useSession() // Получаем сессию на клиенте
	const { items, address } = useAppSelector((state) => state.cart)

	const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
		dispatch(updateItemQuantity({ id, size, quantity }))
	}

	const handleRemove = (id: string, size: string) => {
		dispatch(removeItem({ id, size }))
	}

	const handleCreateOrder = async () => {
		if (!session?.user?.id) {
			alert('Пожалуйста, войдите в систему')
			return
		}

		const orderData = {
			userId: session.user.id,
			items: items.map((item) => ({
				variantId: item.id,
				quantity: item.quantity,
				price: item.price,
				size: item.size,
			})),
			address: address,
		}

		const result = await createOrderAction(orderData)
		if (result.success) {
			dispatch(clearCart())
			return { success: true, orderId: result.orderId }
		}
		return { success: false, message: result.message }
	}

	return { handleUpdateQuantity, handleRemove, handleCreateOrder }
}
