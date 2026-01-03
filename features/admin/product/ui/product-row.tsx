'use client'

import Link from 'next/link'
import { Edit, Trash2 } from 'lucide-react'
import { ROUTE_MAP } from '@/shared/config/routes'
import { ProductListItem } from '@/domain/product/types'

interface ProductRowProps {
	product: ProductListItem
}

export const ProductRow = ({ product }: ProductRowProps) => {
	return (
		<tr className='hover:bg-gray-50 transition border-b'>
			<td className='px-6 py-4'>
				<div className='font-medium text-gray-900'>{product.name}</div>
				<div className='text-xs text-gray-400 font-mono uppercase'>
					{product.brand}
				</div>
			</td>
			<td className='px-6 py-4'>
				<span className='text-sm bg-gray-100 px-2 py-1 rounded'>
					{product.group.title}
				</span>
			</td>
			<td className='px-6 py-4 text-sm text-gray-600 capitalize'>
				{product.gender}
			</td>
			<td className='px-6 py-4 font-semibold text-gray-900'>
				{product.price.toLocaleString()} ₽
			</td>
			<td className='px-6 py-4'>
				<div className='flex gap-1 flex-wrap'>
					{product.variants.map((v) => (
						<span
							key={v.id}
							title={v.color}
							className='w-4 h-4 rounded-full border border-gray-300'
							style={{ backgroundColor: v.color.toLowerCase() }}
						/>
					))}
				</div>
			</td>
			<td className='px-6 py-4 text-right'>
				<div className='flex justify-end gap-2'>
					<Link
						href={`${ROUTE_MAP.admin.products}/${product.id}`}
						className='p-2 text-gray-400 hover:text-blue-600 transition'
					>
						<Edit size={18} />
					</Link>
					<button className='p-2 text-gray-400 hover:text-red-600 transition'>
						<Trash2 size={18} />
					</button>
				</div>
			</td>
		</tr>
	)
}
