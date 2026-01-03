import { DataTable } from '@/shared/ui/data-table'
import { OrderRow } from './order-row'
import { ExtendedOrder } from '../model/types'

const COLUMNS = [
	{ header: 'ID Заказа', key: 'id' },
	{ header: 'Клиент', key: 'user' },
	{ header: 'Статус', key: 'status' },
	{ header: 'Товары', key: 'items' },
	{ header: 'Сумма', key: 'total' },
	{ header: 'Дата', key: 'date' },
]

export const OrdersTable = ({ orders }: { orders: ExtendedOrder[] }) => (
	<DataTable
		items={orders}
		columns={COLUMNS}
		renderRow={(order) => <OrderRow key={order.id} order={order} />}
		emptyText='Заказы не найдены'
	/>
)
