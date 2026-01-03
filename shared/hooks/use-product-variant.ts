import { useState } from 'react'
import { ProductWithVariants } from '@/domain/product/types'
import { ItemSize } from '@/prisma/generated/enums'

export const useProductVariant = (product: ProductWithVariants) => {
	const [variantIndex, setVariantIndex] = useState(0)
	const [selectedSize, setSelectedSize] = useState<ItemSize | undefined>()

	const currentVariant = product.variants[variantIndex]

	const updateSize = (size: ItemSize) => {
		const stock = currentVariant.stock as Record<ItemSize, number>
		if (stock[size] > 0) setSelectedSize(size)
	}

	return {
		currentVariant,
		selectedSize,
		setSelectedSize,
		updateSize,
		variantIndex,
		setVariantIndex,
	}
}
