import { OrdersTable, OrdersHeader } from '@/features/admin/order/ui'
import { orderService } from '@/services/order.service'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Админка просмотра заказов',
}

export default async function AdminOrdersPage() {
	const orders = await orderService.getOrdersList()

	return (
		<div className='space-y-6'>
			<OrdersHeader count={orders.length} />
			<OrdersTable orders={orders} />
		</div>
	)
}
