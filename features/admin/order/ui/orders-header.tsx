export const OrdersHeader = ({ count }: { count: number }) => (
	<div>
		<h1 className='text-2xl font-bold text-gray-900'>Управление заказами</h1>
		<p className='text-sm text-gray-500'>Всего оформлено: {count}</p>
	</div>
)
