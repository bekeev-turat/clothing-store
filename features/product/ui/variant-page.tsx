'use client'

import type { ItemSize } from '@/prisma/generated/client'
import type { ProductWithVariants } from '@/domain/product/types'

import { useProductVariant } from '@/shared/hooks/use-product-variant'

import { ProductGallery } from './product-gallery/product-gallery'
import { SizeSelector } from './size-selector'
import AddToCard from './add-to-card'
import { ProductInfo } from './product-info'
import { ColorSelector } from './color-selector'

export const VariantPage = ({ product }: { product: ProductWithVariants }) => {
	const {
		currentVariant,
		variantIndex,
		setVariantIndex,
		selectedSize,
		setSelectedSize,
		updateSize,
	} = useProductVariant(product)

	const colorVariants = product.variants.map((v) => ({
		id: v.id,
		color: v.color,
		imageUrl: v.images[0]?.url || '',
	}))

	const handleVariantChange = (index: number) => {
		setVariantIndex(index)
		setSelectedSize(undefined)
	}
	return (
		<div className='mt-6 mb-20 grid gap-6 lg:grid-cols-3'>
			<div className='md:col-span-2'>
				<ProductGallery
					title={product.name}
					images={currentVariant.images.map((img) => img.url)}
				/>
			</div>

			<div className='px-5 space-y-6'>
				<ProductHeader name={product.name} price={product.price} />
				<ColorSelector
					variants={colorVariants}
					currentIndex={variantIndex}
					onChange={handleVariantChange}
				/>

				<SizeSelector
					availableSizes={currentVariant.availableSizes}
					stock={currentVariant.stock as Record<ItemSize, number>}
					selectedSize={selectedSize}
					onSelect={updateSize}
				/>

				<AddToCard
					product={product}
					selectedVariantId={currentVariant.id}
					selectedSize={selectedSize}
					onSuccess={() => setSelectedSize(undefined)}
				/>

				<ProductInfo
					description={product.description}
					properties={[
						{ label: 'Бренд', value: product.brand || '' },
						{ label: 'Цвет', value: currentVariant.color },
						{ label: 'Состав', value: product.composition?.join(', ') || '' },
						{ label: 'Артикул', value: product.code || '' },
					]}
				/>
			</div>
		</div>
	)
}

// Вспомогательный мини-компонент внутри файла
const ProductHeader = ({ name, price }: { name: string; price: number }) => (
	<div>
		<h1 className='text-lg font-semibold'>{name}</h1>
		<p className='mt-2 text-xl font-medium'>{price.toLocaleString()} сом</p>
	</div>
)
