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
		<div className='mt-8 mb-20 px-4 max-w-7xl mx-auto'>
			<div className='grid gap-8 lg:grid-cols-12'>
				{/* Галерея: 7 колонок */}
				<div className='lg:col-span-7'>
					<ProductGallery
						title={product.name}
						images={currentVariant.images.map((img) => img.url)}
					/>
				</div>

				{/* Контент: 5 колонок */}
				<div className='lg:col-span-5 space-y-8 lg:sticky lg:top-24 h-fit'>
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
						variantIndex={variantIndex}
						selectedVariantId={currentVariant.id}
						selectedSize={selectedSize}
						onSuccess={() => setSelectedSize(undefined)}
					/>

					{/* Характеристики через Аккордеон */}
					<ProductInfo product={product} color={currentVariant.color} />
				</div>
			</div>
		</div>
	)
}

const ProductHeader = ({ name, price }: { name: string; price: number }) => (
	<div className='space-y-2'>
		<h1 className='text-3xl font-bold tracking-tight'>{name}</h1>
		<div className='flex items-center gap-3'>
			<span className='text-2xl font-bold text-primary'>
				{price.toLocaleString()} сом
			</span>
		</div>
	</div>
)
