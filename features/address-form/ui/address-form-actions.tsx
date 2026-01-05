import { ROUTE_MAP } from '@/shared/config/routes'
import { Button } from '@/shared/ui'
import Link from 'next/link'

export const AddressFormActions = () => (
	<div className='pt-6 flex flex-col sm:flex-row gap-4'>
		<Button type='submit' className='w-full sm:w-1/2 h-12 text-lg font-bold'>
			Подтвердить и продолжить
		</Button>
		<Button variant='ghost' asChild className='w-full sm:w-1/2 h-12'>
			<Link href={ROUTE_MAP.cart.checkout}>Отмена</Link>
		</Button>
	</div>
)
