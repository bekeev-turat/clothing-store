'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTE_MAP } from '@/shared/config/routes'
import { CatalogItem } from '@/domain/product/types'
import { Badge } from '@/shared/ui'

export function ProductCard({ item }: { item: CatalogItem }) {
	const images = item?.variant?.images ?? []
	const [displayImage, setDisplayImage] = useState(images[0])

	if (images.length === 0) return null

	return (
		<Link
			href={ROUTE_MAP.product.detail(encodeURIComponent(item.slug))}
			className='group relative flex flex-col h-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md'
		>
			{/* Image Container */}
			<div className='relative aspect-[3/4] overflow-hidden bg-muted'>
				<Image
					src={displayImage}
					alt={item.name}
					fill
					sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
					className='object-cover transition-transform duration-500 group-hover:scale-105'
					onMouseEnter={() => images[1] && setDisplayImage(images[1])}
					onMouseLeave={() => setDisplayImage(images[0])}
				/>

				{/* Badge (Optional: e.g. New or Sale) */}
				<div className='absolute left-2 top-2 flex flex-col gap-1'>
					{item.tags.includes('premium') && (
						<Badge
							variant='outline'
							className='bg-background/80 backdrop-blur-sm'
						>
							Premium
						</Badge>
					)}

					{item.brand && (
						<Badge
							variant='secondary'
							className='bg-background/60 backdrop-blur-sm text-[10px] uppercase tracking-wider'
						>
							{item.brand}
						</Badge>
					)}
				</div>
			</div>

			{/* Content */}
			<div className='flex flex-col flex-grow p-4'>
				<div className='space-y-1'>
					<h3 className='font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-2'>
						{item.name}
					</h3>
					<p className='text-sm text-muted-foreground line-clamp-1'>
						{/* Опционально: категория или краткое описание */}
						Коллекция 2026
					</p>
				</div>

				<div className='mt-auto pt-3 flex items-center justify-between'>
					<span className='text-lg font-bold text-foreground'>
						{item.price.toLocaleString()}{' '}
						<span className='text-sm font-normal'>сом</span>
					</span>

					{/* Маленькая иконка или стрелочка для вида */}
					<div className='rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
						<svg
							xmlns='www.w3.org'
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M5 12h14m-7-7 7 7-7 7' />
						</svg>
					</div>
				</div>
			</div>
		</Link>
	)
}
