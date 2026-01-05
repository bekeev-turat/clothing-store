'use client'

import Link from 'next/link'
import { Button } from '@/shared/ui'
import { useCheckout } from '@/features/checkout/hooks/use-checkout'
import {
	CheckoutHeader,
	AddressSection,
	OrderItems,
	SummaryCard,
} from '@/features/checkout/ui'

const CheckoutPage = () => {
	const { items, address, totals, isEmpty, onPlaceOrder, isPending } =
		useCheckout()

	if (isEmpty) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
				<p className='text-xl font-medium text-muted-foreground'>
					Корзина пуста
				</p>
				<Button asChild variant='outline'>
					<Link href='/'>Вернуться</Link>
				</Button>
			</div>
		)
	}

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
									className='w-full h-12 text-lg font-bold'
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
