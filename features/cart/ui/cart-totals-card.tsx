import { useTransition } from 'react'
import { currencyFormat } from '@/shared/utils/currencyFormat'
import Link from 'next/link'
import { ROUTE_MAP } from '@/shared/config/routes'
import { cn } from '@/shared/lib'

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

			<Link
				href={ROUTE_MAP.cart.checkout}
				className={cn(
					'w-full bg-black text-white py-4 rounded-lg font-bold flex justify-center items-center',
					(isPending || totalItems === 0) && 'bg-gray-400 pointer-events-none',
				)}
				// Чтобы нельзя было перейти через Tab на клавиатуре
				tabIndex={isPending || totalItems === 0 ? -1 : undefined}
				aria-disabled={isPending || totalItems === 0}
			>
				{isPending ? 'Оформление...' : 'Оформить заказ'}
			</Link>
		</div>
	)
}
