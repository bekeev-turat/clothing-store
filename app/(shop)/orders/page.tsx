// Todo исправить типы OrderRow
import Link from 'next/link'
import { IoCardOutline } from 'react-icons/io5'
import { getOrdersByUserAction } from '@/actions/order.actions'
import { OrderStatus } from '@/prisma/generated/client'
import clsx from 'clsx'
import { currencyFormat } from '@/shared/utils/currencyFormat'
import { DataTable } from '@/shared/ui/data-table'
import { IOrder } from '@/domain/order/types'

export default async function OrdersPage() {
	const response = await getOrdersByUserAction()
	console.log(response);
	if (!response.success) {
		return <div>Ошибка загрузки заказов</div>
	}
	

	const orders = response.data

	const columns = [
		{ header: '#ID Заказа', key: 'id' },
		{ header: 'Дата', key: 'createdAt' },
		{ header: 'Статус', key: 'status' },
		{ header: 'Сумма', key: 'totalAmount' },
		{ header: 'Действия', key: 'actions', className: 'text-right' },
	]

	return (
		<div className='max-w-6xl mx-auto px-4 py-10'>
			<h3 className='mb-6 text-2xl font-bold'>Мои заказы</h3>

			<DataTable
				items={orders}
				columns={columns}
				emptyText='У вас пока нет заказов'
				renderRow={(order) => <OrderRow key={order.id} order={order} />}
			/>
		</div>
	)
}

type Props = {
	order: IOrder
}

export const OrderRow = ({ order }: Props) => {
	return (
		<tr className='transition-colors hover:bg-gray-50'>
			<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
				{order.id.slice(-8).toUpperCase()}
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
				{new Date(order.createdAt).toLocaleDateString('ru-RU')}
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='flex items-center'>
					<IoCardOutline
						className={clsx(
							'mr-2',
							order.status === OrderStatus.PAID
								? 'text-green-600'
								: 'text-amber-500',
						)}
					/>
					<span
						className={clsx(
							'text-sm font-medium',
							order.status === OrderStatus.PAID
								? 'text-green-700'
								: 'text-amber-700',
						)}
					>
						{order.status === OrderStatus.PAID ? 'Оплачен' : 'В обработке'}
					</span>
				</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold'>
				{currencyFormat(order.totalAmount)}
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
				<Link
					href={`/orders/${order.id}`}
					className='text-indigo-600 hover:text-indigo-900 transition-colors'
				>
					Детали
				</Link>
			</td>
		</tr>
	)
}
