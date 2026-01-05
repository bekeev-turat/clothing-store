import { IOrderTotals } from '@/features/cart/model/cart.types'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
} from '@/shared/ui'
import { currencyFormat } from '@/shared/utils/currencyFormat'
import { CreditCard } from 'lucide-react'
import { ReactNode } from 'react'

export const SummaryCard = ({
	totals,
	actionButton,
	title,
}: {
	title?: string

	totals: IOrderTotals & { totalItems?: number }
	actionButton: ReactNode
}) => (
	<Card className='border-2 border-primary/10 sticky top-8'>
		<CardHeader>
			<CardTitle className='flex items-center gap-2'>
				<CreditCard /> {title}
			</CardTitle>
		</CardHeader>
		<CardContent className='space-y-4'>
			<div className='space-y-2 text-sm'>
				<div className='flex justify-between'>
					<span>Товары ({totals.totalItems})</span>
					<span>{currencyFormat(totals.subTotal)}</span>
				</div>
				<div className='flex justify-between'>
					<span>Налог</span>
					<span>{currencyFormat(totals.tax)}</span>
				</div>
				<div className='flex justify-between text-green-600'>
					<span>Доставка</span>
					<span>Бесплатно</span>
				</div>
			</div>
			<Separator />
			<div className='flex justify-between items-baseline'>
				<span className='text-lg font-bold'>К оплате</span>
				<span className='text-2xl font-bold text-primary'>
					{currencyFormat(totals.total)}
				</span>
			</div>
			{actionButton}
		</CardContent>
	</Card>
)
