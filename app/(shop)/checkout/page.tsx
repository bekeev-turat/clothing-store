'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useCheckout } from '@/features/checkout/hooks/use-checkout'

import {
	CheckoutHeader,
	AddressSection,
	OrderItems,
	SummaryCard,
} from '@/features/checkout/ui'

import { Button } from '@/shared/ui'

const CheckoutPage = () => {
	const router = useRouter()
	const { items, address, totals, isEmpty, onPlaceOrder, isPending } =
		useCheckout()

	useEffect(() => {
		if (isEmpty) {
			router.push('/empty')
		}
	}, [isEmpty, router])

	return (
		<div className='bg-background min-h-screen pb-20'>
			<div className='max-w-6xl mx-auto px-4 pt-8'>
				<CheckoutHeader />

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
					<div className='lg:col-span-8 space-y-6'>
						<OrderItems items={items} />

						{/* Секция адреса */}
						<AddressSection address={address} />
					</div>

					<div className='lg:col-span-4'>
						<SummaryCard
							title='Ваш заказ'
							totals={totals}
							actionButton={
								<Button
									onClick={onPlaceOrder}
									className='w-full h-12 text-lg font-bold hover:scale-105 transition-transform'
									size='lg'
									disabled={isPending}
								>
									{isPending ? 'Оформление...' : 'Оплатить заказ'}
								</Button>
							}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckoutPage
