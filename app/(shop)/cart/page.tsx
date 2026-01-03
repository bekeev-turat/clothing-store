'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useAppSelector } from '@/shared/store/hooks'
import {
	selectSubtotal,
	selectTax,
	selectTotalPrice,
	selectTotalItems,
} from '@/features/cart/store/cart.selectors'

import { CartItemsList } from '@/features/cart/ui/cart-items-list'
import { CartTotalsList } from '@/features/cart/ui/cart-totals-card'
import { useCartActions } from '@/features/cart/hooks/use-cart-actions'

const CartPage = () => {
	const router = useRouter()
	const items = useAppSelector((state) => state.cart.items)
	const { handleUpdateQuantity, handleRemove, handleCreateOrder } =
		useCartActions()

	const totals = {
		totalItems: useAppSelector(selectTotalItems),
		subTotal: useAppSelector(selectSubtotal),
		tax: useAppSelector(selectTax),
		total: useAppSelector(selectTotalPrice),
	}

	useEffect(() => {
		if (items.length === 0) {
			router.push('/empty')
		}
	}, [items.length, router])

	const onCheckout = async () => {
		const result = await handleCreateOrder()
		if (result?.success) {
			alert('Заказ создан!')
			router.push('/orders/success')
		} else if (result?.message) {
			alert(result.message)
		}
	}

	if (items.length === 0) return null

	return (
		<section className='max-w-6xl mx-auto px-6 py-10'>
			<header className='mb-10'>
				<h1 className='text-3xl font-bold'>Ваша корзина покупок</h1>
			</header>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2'>
					<CartItemsList
						items={items}
						onUpdateQuantity={handleUpdateQuantity}
						onRemove={handleRemove}
					/>
					<Link href='/' className='inline-block mt-6 text-sm underline'>
						← Продолжить покупки
					</Link>
				</div>

				<CartTotalsList {...totals} onCheckout={onCheckout} />
			</div>
		</section>
	)
}

export default CartPage
