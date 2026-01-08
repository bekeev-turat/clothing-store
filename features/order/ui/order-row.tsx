import { IOrder } from '@/domain/order/types'
import { OrderStatus } from '@/prisma/generated/enums'
import { cn } from '@/shared/lib'
import { currencyFormat } from '@/shared/utils/currencyFormat'
import Link from 'next/link'
import { IoCardOutline } from 'react-icons/io5'

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
						className={cn(
							'mr-2',
							order.status === OrderStatus.PAID
								? 'text-green-600'
								: 'text-amber-500',
						)}
					/>
					<span
						className={cn(
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
