import Image from 'next/image'
import { type CatalogItem } from '@/domain/product/types'
import Link from 'next/link'
import { ROUTE_MAP } from '@/shared/config/routes'

export const ProductSearchCard = ({ item }: { item: CatalogItem }) => (
	<div
		className='group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl 
		transition-all duration-300 hover:scale-110'
	>
		<Link href={ROUTE_MAP.product.detail(item.slug)}>
			<div className='relative aspect-3/4 overflow-hidden bg-gray-100'>
				{item.variant?.images?.[0] ? (
					<Image
						src={item.variant.images[0]}
						alt={item.name}
						fill
						sizes='(max-width: 768px) 100vw, 25vw'
						className='object-cover transition-transform duration-500 group-hover:scale-110'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-gray-400'>
						Нет фото
					</div>
				)}
			</div>

			<div className='p-4'>
				<h2 className='text-sm font-medium text-gray-900 line-clamp-1'>
					{item.name}
				</h2>
				<p className='text-lg font-bold mt-1'>
					{item.price.toLocaleString()} ₽
				</p>
			</div>
		</Link>
	</div>
)
