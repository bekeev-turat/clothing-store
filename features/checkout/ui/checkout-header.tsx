import { ROUTE_MAP } from '@/shared/config/routes'
import { Button } from '@/shared/ui'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const CheckoutHeader = () => (
	<div className='mb-8'>
		<Button
			variant='ghost'
			size='sm'
			asChild
			className='-ml-2 text-muted-foreground'
		>
			<Link href={ROUTE_MAP.cart.root}>
				<ChevronLeft className='w-4 h-4' /> Назад
			</Link>
		</Button>
		<h1 className='text-4xl font-extrabold tracking-tight'>
			Оформление заказа
		</h1>
	</div>
)
