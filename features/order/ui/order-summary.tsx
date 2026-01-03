import { currencyFormat } from '@/shared/utils/currencyFormat'
import { IoCardOutline } from 'react-icons/io5'
import clsx from 'clsx'

interface Props {
	isPaid: boolean
	totals: {
		totalItems: number
		subTotal: number
		tax: number
		total: number
	}
	userId: string
}

export const OrderSummary = ({ totals, isPaid, userId }: Props) => {
	return (
		<div className='border rounded-xl p-6 bg-white shadow-sm h-fit'>
			<h2 className='text-xl font-bold mb-4'>Адрес доставки</h2>
			<div className='text-sm leading-relaxed mb-6'>
				<p className='font-medium text-black'>Пользователь ID: {userId}</p>
				<p className='font-semibold'>Иван Иванов</p>
				<p>ул. Ленина, д. 10, кв. 5</p>
				<p>Москва, Россия</p>
				<p>101000</p>
				<p>+996 (789) 12-34-67</p>
			</div>

			<div className='border-t pt-4 mb-6'>
				<h2 className='text-xl font-bold mb-4'>Сводка заказа</h2>
				<div className='grid grid-cols-2 gap-y-2 text-sm'>
					<span>Товары ({totals.totalItems}):</span>
					<span className='text-right'>{currencyFormat(totals.subTotal)}</span>

					<span>Налог (15%):</span>
					<span className='text-right'>{currencyFormat(totals.tax)}</span>

					<div className='col-span-2 border-t my-2' />

					<span className='text-2xl font-bold'>Итого:</span>
					<span className='text-2xl font-bold text-right text-blue-600'>
						{currencyFormat(totals.total)}
					</span>
				</div>
			</div>

			<div
				className={clsx(
					'flex items-center justify-center gap-2 rounded-lg py-3 font-bold',
					isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
				)}
			>
				<IoCardOutline size={20} />
				{isPaid ? 'ЗАКАЗ ОПЛАЧЕН' : 'ОПЛАТА НЕ ПОЛУЧЕНА'}
			</div>
		</div>
	)
}
