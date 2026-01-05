import Image from 'next/image'
import { currencyFormat } from '@/shared/utils/currencyFormat'
import { ICartItem } from '@/features/cart/model/cart.types'

export const OrderItemsList = ({ items }: { items: ICartItem[] }) => {
	return (
		<div className='space-y-4'>
			{items.map((item) => (
				<div
					key={`${item.id}-${item.size}`}
					className='flex gap-4 border rounded-xl p-4 bg-white'
				>
					<Image
						src={item.image}
						alt={item.title}
						width={100}
						height={100}
						className='rounded-lg object-cover'
					/>

					<div className='flex flex-col justify-between py-1'>
						<div>
							<p className='font-medium'>{item.title}</p>
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
