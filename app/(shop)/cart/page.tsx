'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { ROUTE_MAP } from '@/shared/config/routes'
import { cn } from '@/shared/lib'

import { useAppSelector } from '@/shared/store/hooks'
import { useCartActions } from '@/features/cart/hooks/use-cart-actions'
import { useCheckout } from '@/features/checkout/hooks/use-checkout'

import { SummaryCard } from '@/features/checkout/ui'
import { CartItemsList } from '@/features/cart/ui/cart-items-list'

const CartPage = () => {
	const router = useRouter()
	const items = useAppSelector((state) => state.cart.items)
	const { handleUpdateQuantity, handleRemove } = useCartActions()
	const { totals } = useCheckout()

	useEffect(() => {
		if (items.length === 0) {
			router.push('/empty')
		}
	}, [items.length, router])

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
				<SummaryCard
					totals={totals}
					actionButton={
						<Link
							href={ROUTE_MAP.cart.checkout}
							className={cn(
								'block w-full bg-black text-white py-4 rounded-lg font-bold text-center transition-transform hover:scale-105 mt-2',
								totals.totalItems === 0 && 'opacity-50 pointer-events-none',
							)}
						>
							Перейти к оформлению
						</Link>
					}
				/>
			</div>
		</section>
	)
}

export default CartPage
