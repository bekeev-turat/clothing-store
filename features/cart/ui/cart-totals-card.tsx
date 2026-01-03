import { useTransition } from 'react'
import { currencyFormat } from '@/shared/utils/currencyFormat'

interface Props {
	totalItems: number
	subTotal: number
	tax: number
	total: number
	onCheckout: () => Promise<void>
}

export const CartTotalsList = ({
	totalItems,
	subTotal,
	tax,
	total,
	onCheckout,
}: Props) => {
	const [isPending, startTransition] = useTransition()

	const handleAction = () => {
		startTransition(async () => {
			await onCheckout()
		})
	}

	return (
		<div className='flex flex-col gap-4 border p-6 rounded-xl bg-gray-50 h-fit'>
			<div className='grid grid-cols-2 gap-y-2'>
				<span>Товары ({totalItems}):</span>
				<span className='text-right'>{currencyFormat(subTotal)}</span>
				<span>Налоги (15%):</span>
				<span className='text-right'>{currencyFormat(tax)}</span>
				<div className='col-span-2 border-t my-2' />
				<span className='text-2xl font-bold'>Итого:</span>
				<span className='text-2xl font-bold text-right'>
					{currencyFormat(total)}
				</span>
			</div>

			<button
				onClick={handleAction}
				disabled={isPending || totalItems === 0}
				className='w-full bg-black text-white py-4 rounded-lg font-bold disabled:bg-gray-400'
			>
				{isPending ? 'Оформление...' : 'Оформить заказ'}
			</button>
		</div>
	)
}
