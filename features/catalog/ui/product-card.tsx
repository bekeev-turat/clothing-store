'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ROUTE_MAP } from '@/shared/config/routes'
import Link from 'next/link'
import { CatalogItem } from '@/domain/product/types'

export function ProductCard({ item }: { item: CatalogItem }) {
	const images = item?.variant?.images ?? []

	const [displayImage, setDisplayImage] = useState(images[0])

	if (images.length === 0) return null

	return (
		<div className='rounded-md overflow-hidden'>
			<Link href={ROUTE_MAP.product.detail(encodeURIComponent(item.slug))}>
				<Image
					src={displayImage}
					alt={item.name}
					width={400}
					height={400}
					className='w-full object-cover transition-all duration-300'
					onMouseEnter={() => images[1] && setDisplayImage(images[1])}
					onMouseLeave={() => setDisplayImage(images[0])}
				/>
			</Link>

			<p className='mt-2 font-medium'>{item.name}</p>
			<p className='text-sm text-gray-600'>Цена: {item.price} сом</p>
		</div>
	)
}
