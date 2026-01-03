import Image from 'next/image'
import Link from 'next/link'
import { QuantityControl } from '@/shared/ui/cart/quantity-control'
import { CartItem } from '../store/cart.types'

interface Props {
	items: CartItem[] // Опишите ваш интерфейс CartItem
	onUpdateQuantity: (id: string, size: string, q: number) => void
	onRemove: (id: string, size: string) => void
}

export const CartItemsList = ({ items, onUpdateQuantity, onRemove }: Props) => {
	return (
		<div className='space-y-6'>
			{items.map((item) => (
				<div
					key={`${item.id}-${item.size}`}
					className='flex gap-5 border rounded-lg p-4'
				>
					<Image
						src={item.image}
						alt={item.title}
						width={120}
						height={120}
						className='rounded object-cover'
					/>
					<div className='flex-1'>
						<Link
							href={`/product/${item.slug}`}
							className='font-medium hover:underline'
						>
							{item.title}
						</Link>
						<p className='text-sm text-gray-500'>Size: {item.size}</p>
						<p className='mt-2 font-semibold'>${item.price}</p>
						<div className='flex items-center justify-between mt-4'>
							<QuantityControl
								value={item.quantity}
								onChange={(val) => onUpdateQuantity(item.id, item.size, val)}
							/>
							<button
								onClick={() => onRemove(item.id, item.size)}
								className='text-sm text-red-500 hover:underline'
							>
								Убрать
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
