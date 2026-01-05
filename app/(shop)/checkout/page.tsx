'use client'

import Link from 'next/link'
import {
	Button,
	Separator,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/ui'
import { ChevronLeft, Truck, CreditCard } from 'lucide-react'
import { ROUTE_MAP } from '@/shared/config/routes'
import { OrderItems } from '@/features/cart/ui/order-items'
import { useCheckout } from '@/features/cart/hooks/use-checkout'
import { IOrderAddress, IOrderTotals } from '@/features/cart/model/cart.types'

const CheckoutPage = () => {
	const { items, address, totals, isEmpty, onPlaceOrder } = useCheckout()

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
				<Header />

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
					<div className='lg:col-span-8 space-y-6'>
						<OrderItems items={items} />

						{/* Секция адреса */}
						<AddressSection address={address} />
					</div>

					<div className='lg:col-span-4'>
						<SummaryCard totals={totals} onAction={onPlaceOrder} />
					</div>
				</div>
			</div>
		</div>
	)
}

// Вспомогательные мини-компоненты для соблюдения SRP внутри файла
const Header = () => (
	<div className='mb-8'>
		<Button
			variant='ghost'
			size='sm'
			asChild
			className='-ml-2 text-muted-foreground'
		>
			<Link href={ROUTE_MAP.cart.root}>
				<ChevronLeft className='w-4 h-4' /> Назад
			</Link>
		</Button>
		<h1 className='text-4xl font-extrabold tracking-tight'>
			Оформление заказа
		</h1>
	</div>
)

const SummaryCard = ({
	totals,
	onAction,
}: {
	totals: IOrderTotals
	onAction: () => void
}) => (
	<Card className='border-2 border-primary/10 sticky top-8'>
		<CardHeader>
			<CardTitle className='flex items-center gap-2'>
				<CreditCard /> Итог заказа
			</CardTitle>
		</CardHeader>
		<CardContent className='space-y-4'>
			<div className='space-y-2 text-sm'>
				<div className='flex justify-between'>
					<span>Товары</span>
					<span>${totals.subTotal}</span>
				</div>
				<div className='flex justify-between'>
					<span>Налог</span>
					<span>${totals.tax}</span>
				</div>
				<div className='flex justify-between text-green-600'>
					<span>Доставка</span>
					<span>Бесплатно</span>
				</div>
			</div>
			<Separator />
			<div className='flex justify-between items-baseline'>
				<span className='text-lg font-bold'>К оплате</span>
				<span className='text-2xl font-bold text-primary'>${totals.total}</span>
			</div>
			<Button
				onClick={onAction}
				className='w-full h-12 text-lg font-bold'
				size='lg'
			>
				Оплатить заказ
			</Button>
		</CardContent>
	</Card>
)

const AddressSection = ({ address }: { address: IOrderAddress }) => (
	<Card>
		<CardHeader className='flex flex-row items-center justify-between'>
			<CardTitle className='text-xl flex items-center gap-2'>
				<Truck className='w-5 h-5' /> Адрес
			</CardTitle>
			<Button variant='link' asChild>
				<Link href={ROUTE_MAP.cart.address}>Изменить</Link>
			</Button>
		</CardHeader>
		<CardContent className='grid md:grid-cols-2 gap-4 text-sm'>
			<div className='p-4 rounded-lg bg-muted/50'>
				<p className='font-bold'>
					{address?.firstName} {address?.lastName}
				</p>
				<p>
					{address?.address}, {address?.city}
				</p>
			</div>
		</CardContent>
	</Card>
)

export default CheckoutPage
