'use client'

import { useState } from 'react'

import type { ItemSize } from '@/prisma/generated/enums'
import type { ProductWithVariants } from '@/domain/product/types'

import { QuantityControl } from '@/shared/ui/cart/quantity-control'

import { useAppDispatch } from '@/shared/store/hooks'
import { addItem } from '@/features/cart/store/cart.slice'
import toast from 'react-hot-toast'
import { Button } from '@/shared/ui'
import { ShoppingCart } from 'lucide-react'

interface Props {
	product: ProductWithVariants
	selectedVariantId: string
	selectedSize: ItemSize | undefined
	variantIndex: number
	onSuccess?: () => void
}

const AddToCard = ({
	product,
	selectedSize,
	selectedVariantId,
	variantIndex,
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
				image: product.variants[variantIndex].images[0]?.url || '',
			}),
		)

		toast.success('Товар добавлен в корзину!')

		setQuantity(1)
		setPosted(false)
		onSuccess?.()
	}

	return (
		<div className='flex flex-col gap-4 py-4 border-t border-b border-border/50'>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-medium'>Количество</span>
				<QuantityControl value={quantity} onChange={setQuantity} />
			</div>

			{posted && !selectedSize && (
				<p className='text-destructive text-xs font-semibold animate-bounce'>
					Пожалуйста, выберите размер перед добавлением
				</p>
			)}

			<Button
				size='lg'
				className='w-full text-base font-semibold h-12 shadow-lg transition-transform hover:scale-[1.01]'
				onClick={onAddToCard}
				disabled={!product.variants[variantIndex].stock} // пример проверки
			>
				<ShoppingCart className='mr-2 h-5 w-5' />
				Добавить в корзину
			</Button>
		</div>
	)
}

export default AddToCard
