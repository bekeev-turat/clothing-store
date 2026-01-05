import { IOrderAddress } from '@/features/cart/model/cart.types'
import { ROUTE_MAP } from '@/shared/config/routes'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { Truck } from 'lucide-react'
import Link from 'next/link'

export const AddressSection = ({ address }: { address: IOrderAddress }) => (
	<Card>
		<CardHeader className='flex flex-row items-center justify-between'>
			<CardTitle className='text-xl flex items-center gap-2'>
				<Truck className='w-5 h-5' /> Адрес
			</CardTitle>
			<Button variant='link' asChild>
				<Link href={ROUTE_MAP.cart.address}>Изменить</Link>
			</Button>
		</CardHeader>
		<CardContent className='grid md:grid-cols-2 gap-4 text-sm'>
			<div className='p-4 rounded-lg bg-muted/50'>
				<p className='font-bold'>
					{address?.firstName} {address?.lastName}
				</p>
				<p>
					{address?.address}, {address?.city}
				</p>
			</div>
		</CardContent>
	</Card>
)
