import { getOrdersByUserAction } from '@/actions/order.actions'
import { DataTable } from '@/shared/ui/data-table'
import { OrderRow } from '@/features/order/ui/order-row'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Личный кабинет просмотра заказов | Магазин BeUp',
	description: 'Управление вашими данными и заказами',
}

export default async function OrdersPage() {
	const response = await getOrdersByUserAction()

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
