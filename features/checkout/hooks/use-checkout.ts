'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { clearCart } from '@/features/cart/store/cart.slice'
import { createOrderAction } from '@/actions/order.actions'
import * as selectors from '@/features/cart/store/cart.selectors'
import { ICartItem, IOrderAddress } from '@/features/cart/model/cart.types'

export const useCheckout = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { data: session } = useSession()
	const [isPending, setIsPending] = useState(false)

	// 1. Получаем данные из Store (атомарно)
	const items = useAppSelector((state) => state.cart.items)
	const address = useAppSelector((state) => state.cart.address)

	const totals = {
		totalItems: useAppSelector(selectors.selectTotalItems),
		subTotal: useAppSelector(selectors.selectSubtotal),
		tax: useAppSelector(selectors.selectTax),
		total: useAppSelector(selectors.selectTotalPrice),
	}

	// 2. Вспомогательная логика валидации
	const validateOrder = () => {
		if (!session?.user?.id) throw new Error('Пожалуйста, войдите в систему')
		if (!items.length) throw new Error('Корзина пуста')
		if (!address) throw new Error('Укажите адрес доставки')
	}

	// 3. Основная функция (читается как рассказ)
	const onPlaceOrder = useCallback(async () => {
		if (isPending) return

		const toastId = toast.loading('Оформление заказа...')
		setIsPending(true)

		try {
			validateOrder()

			const result = await createOrderAction({
				userId: session!.user.id,
				address,
				items: items.map(({ id, quantity }) => ({ variantId: id, quantity })),
			})

			if (!result.success) throw new Error(result.message)

			dispatch(clearCart())
			toast.success('Заказ создан!', { id: toastId })
			router.push(`/orders/payment/${result.orderId}`)
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : 'Произошла ошибка'

			toast.error(message, { id: toastId })
		} finally {
			setIsPending(false)
		}
	}, [isPending, session, items, address, dispatch, router])

	return {
		onPlaceOrder,
		isPending,
		items: items as ICartItem[],
		address: address as IOrderAddress,
		totals,
		isEmpty: items.length === 0,
	}
}
