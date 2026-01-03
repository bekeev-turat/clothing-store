import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { ROUTE_MAP } from '@/shared/config/routes'

export default function EmptyCartPage() {
	return (
		<section className='min-h-[70vh] flex items-center justify-center px-4'>
			<div className='max-w-md text-center space-y-6'>
				<div className='flex justify-center'>
					<ShoppingBag size={72} className='text-gray-400' />
				</div>

				<h1 className='text-3xl font-bold'>
					Ваша корзина в данный момент пуста.
				</h1>

				<p className='text-gray-500 text-base'>
					Похоже, вы еще не добавили ни одного товара. Просмотрите каталог,
					чтобы начать.
				</p>

				<Link
					href={ROUTE_MAP.home}
					className='inline-flex items-center justify-center rounded-lg bg-primary hover:scale-105 text-white 
						px-6 py-3 text-sm font-medium hover:opacity-90 transition'
				>
					Перейти в каталог
				</Link>
			</div>
		</section>
	)
}
