'use client'

import { useState } from 'react'

import type { ItemSize } from '@/prisma/generated/enums'
import type { ProductWithVariants } from '@/domain/product/types'

import { QuantityControl } from '@/shared/ui/cart/quantity-control'

import { useAppDispatch } from '@/shared/store/hooks'
import { addItem } from '@/features/cart/store/cart.slice'

interface Props {
	product: ProductWithVariants
	selectedVariantId: string
	selectedSize: ItemSize | undefined
	// Добавляем колбэк для сброса после добавления, если нужно
	onSuccess?: () => void
}

const AddToCard = ({
	product,
	selectedSize,
	selectedVariantId,
	onSuccess,
}: Props) => {
	const dispatch = useAppDispatch()
	const [quantity, setQuantity] = useState<number>(1)
	const [posted, setPosted] = useState(false)

	const onAddToCard = () => {
		if (!selectedSize) {
			setPosted(true)
			return
		}

		dispatch(
			addItem({
				id: selectedVariantId,
				slug: product.slug,
				title: product.name,
				price: product.price,
				quantity,
				size: selectedSize,
				image: product.variants[0].images[0]?.url || '',
			}),
		)

		setQuantity(1)
		setPosted(false)
		onSuccess?.()
	}

	return (
		<div className='flex flex-col gap-4'>
			{posted && !selectedSize && (
				<span className='text-red-600 font-bold text-sm'>
					Вы должны выбрать размер!
				</span>
			)}

			<QuantityControl value={quantity} onChange={setQuantity} />

			<button
				className='btn-primary w-full py-3 bg-black text-white rounded-md disabled:bg-gray-400'
				onClick={onAddToCard}
			>
				Добавить в корзину
			</button>
		</div>
	)
}

export default AddToCard
