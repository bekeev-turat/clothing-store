import { OrderStatus } from '@/prisma/generated/enums'
import { Package, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react'
import { ExtendedOrder } from '../model/types'

const statusConfig = {
	[OrderStatus.PENDING]: {
		label: 'Ожидает',
		color: 'text-yellow-600 bg-yellow-50',
		icon: Clock,
	},
	[OrderStatus.PAID]: {
		label: 'Оплачен',
		color: 'text-blue-600 bg-blue-50',
		icon: CheckCircle2,
	},
	[OrderStatus.SHIPPED]: {
		label: 'В пути',
		color: 'text-purple-600 bg-purple-50',
		icon: Truck,
	},
	[OrderStatus.DELIVERED]: {
		label: 'Доставлен',
		color: 'text-green-600 bg-green-50',
		icon: Package,
	},
	[OrderStatus.CANCELLED]: {
		label: 'Отменен',
		color: 'text-red-600 bg-red-50',
		icon: XCircle,
	},
}

export const OrderRow = ({ order }: { order: ExtendedOrder }) => {
	const status = statusConfig[order.status as OrderStatus]

	return (
		<tr className='hover:bg-gray-50 transition border-b'>
			<td className='px-6 py-4 font-mono text-xs text-blue-600'>
				#{order.id.slice(0, 8)}
			</td>
			<td className='px-6 py-4'>
				<div className='text-sm font-medium'>{order.user.username}</div>
				<div className='text-xs text-gray-400'>{order.user.email}</div>
			</td>
			<td className='px-6 py-4'>
				<span
					className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}
				>
					<status.icon size={14} />
					{status.label}
				</span>
			</td>
			<td className='px-6 py-4 text-sm text-gray-600'>
				{order.items.length} поз.
			</td>
			<td className='px-6 py-4 font-bold'>
				{order.totalAmount.toLocaleString()} ₽
			</td>
			<td className='px-6 py-4 text-sm text-gray-500'>
				{new Date(order.createdAt).toLocaleDateString('ru-RU')}
			</td>
		</tr>
	)
}
