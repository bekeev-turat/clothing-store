import { notFound } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'
import clsx from 'clsx'

// import { OrderItemsList } from '@/features/order/ui/order-items-list'
import { OrderSummary } from '@/features/order/ui/order-summary'
import { getOrderByIdAction } from '@/actions/order.actions'
import { OrderStatus } from '@/prisma/generated/client'

interface Props {
	params: Promise<{ id: string }>
}
export default async function OrderPage({ params }: Props) {
	const { id } = await params

	const response = await getOrderByIdAction(id)
	console.log(response)

	// Если заказ не найден, показываем 404
	if (!response.success || !response.data) {
		notFound()
	}

	const address = {
		firstName: response.data.address,
		lastName: response.data.lastName,
		address: response.data.address,
		address2: response.data.address2,
		city: response.data.city,
		zip: response.data.zip,
		phone: response.data.phone,
	}
	const order = response.data
	const isPaid = order.status === OrderStatus.PAID

	const totals = {
		totalItems: order.items.reduce((sum, item) => sum + item.quantity, 0),
		subTotal: order.totalAmount,
		tax: order.totalAmount * 0.15,
		total: order.totalAmount,
	}

	return (
		<section className='max-w-6xl mx-auto px-4 py-10'>
			<header className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-800'>
					Заказ #{id.slice(-8).toUpperCase()}
				</h1>
			</header>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Список товаров и статус */}
				<div className='md:col-span-2 flex flex-col gap-6'>
					<div
						className={clsx(
							'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors',
							isPaid ? 'bg-green-600' : 'bg-amber-500',
						)}
					>
						<IoCardOutline size={22} />
						<span>{isPaid ? 'Оплачено' : `Статус: ${order.status}`}</span>
					</div>

					{/* <OrderItemsList items={order.items} /> */}
				</div>

				<div className='flex flex-col gap-6'>
					<OrderSummary address={address} totals={totals} isPaid={isPaid} userId={order.userId} />
				</div>
			</div>
		</section>
	)
}
