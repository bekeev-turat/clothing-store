import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/shared/ui'
import { Package } from 'lucide-react'
import Link from 'next/link'
import { ROUTE_MAP } from '@/shared/config/routes'
import { ICartItem } from '@/features/cart/model/cart.types'
import { currencyFormat } from '@/shared/utils/currencyFormat'

export const OrderItems = ({ items }: { items: ICartItem[] }) => (
	<Card>
		<CardHeader className='flex flex-row items-center justify-between'>
			<CardTitle className='text-xl flex items-center gap-2'>
				<Package className='w-5 h-5' /> Товары ({items.length})
			</CardTitle>
			<Button variant='link' asChild className='p-0'>
				<Link href={ROUTE_MAP.cart.root}>Изменить</Link>
			</Button>
		</CardHeader>
		<CardContent className='space-y-4'>
			{items.map((item) => (
				<div key={item.id} className='flex gap-4'>
					<div className='relative w-16 h-16 rounded-md overflow-hidden bg-muted border'>
						<Image
							src={item.image}
							alt={item.title}
							fill
							className='object-cover'
						/>
					</div>
					<div className='flex-grow'>
						<h3 className='font-medium text-sm'>{item.title}</h3>
						<p className='text-muted-foreground text-sm'>
							Кол-во: {item.quantity}
						</p>
					</div>
					<p className='font-semibold'>
						{currencyFormat(item.price * item.quantity)}
					</p>
				</div>
			))}
		</CardContent>
	</Card>
)
