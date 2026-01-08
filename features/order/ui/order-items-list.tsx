import { currencyFormat } from '@/shared/utils/currencyFormat'
import { IOrderItem } from '@/domain/order/types'

export const OrderItemsList = ({ items }: { items: IOrderItem[] }) => {
	return (
		<div className='space-y-4'>
			{items.map((item) => (
				<div
					key={`${item.id}-${item.size}`}
					className='flex gap-4 border rounded-xl p-4 bg-white'
				>
					<div className='flex flex-col justify-between py-1'>
						<div>
							<p className='font-medium'>{item.variantId}</p>
							<p className='text-sm text-gray-500'>Размер: {item.size}</p>
							<p className='text-sm'>
								{item.quantity} шт. x {currencyFormat(item.price)}
							</p>
						</div>
						<p className='font-bold mt-1'>
							Субтотал: {currencyFormat(item.price * item.quantity)}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}
