'use client'

import { useAppDispatch } from '@/shared/store/hooks'
import { removeItem, updateItemQuantity } from '../store/cart.slice'

export const useCartActions = () => {
	const dispatch = useAppDispatch()

	const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
		dispatch(updateItemQuantity({ id, size, quantity }))
	}

	const handleRemove = (id: string, size: string) => {
		dispatch(removeItem({ id, size }))
	}

	return { handleUpdateQuantity, handleRemove }
}
