// TODO Сделать по solid структуру компонентов

'use client'
import { cn } from '@/shared/lib/utils'
import { ItemSize } from '@/prisma/generated/enums'
import { ProductGallery } from '@/features/product/ui/product-gallery/product-gallery'
import { useState } from 'react'
import AddToCard from './ui/AddToCard'
import { type ProductWithVariants } from '@/domain/product/types'

type StockMapType = Record<ItemSize, number>

const sizeMap: Record<string, number> = {
	S: 44,
	M: 46,
	L: 48,
	XL: 50,
	XXL: 52,
}

type ProductProperty = {
	label: string
	value: string
}

export const VariantPage = ({ product }: { product: ProductWithVariants }) => {
	const [variantIndex, setVariantIndex] = useState<number>(0)
	const [selectedSize, setSelectedSize] = useState<ItemSize | undefined>(
		undefined,
	)

	if (!product) return <div>Товар не найден</div>

	const currentVariant = product.variants[variantIndex]
	const stock = currentVariant.stock as StockMapType

	const properties = [
		{ label: 'Бренд', value: product?.brand || '' },
		{ label: 'Цвет', value: product?.variants[variantIndex].color },
		{ label: 'Состав', value: product?.composition?.join(', ') || '' },
		{ label: 'Артикул', value: product?.code || '' },
	]

	return (
		<div className='mt-6 mb-20 grid gap-6 lg:grid-cols-3'>
			<div className='md:col-span-2'>
				<ProductGallery
					title={product.name}
					images={currentVariant.images.map((img) => img.url)}
				/>
			</div>

			<div className='px-5 space-y-6'>
				<div>
					<h1 className='text-lg font-semibold'>{product?.name}</h1>
					<p className='mt-2 text-xl font-medium'>
						{product?.price.toLocaleString()} сом
					</p>
				</div>

				{/* СЕКТОР ВЫБОРА РАЗМЕРА */}
				<div className='flex flex-wrap gap-3'>
					{currentVariant.availableSizes.map((size) => {
						const isOutOfStock = stock[size] === 0
						const isSelected = selectedSize === size

						return (
							<button
								key={size}
								disabled={isOutOfStock}
								onClick={() => setSelectedSize(size)}
								className={cn(
									'flex h-14 w-14 flex-col items-center justify-center rounded-md border transition-all',
									isOutOfStock
										? 'cursor-not-allowed opacity-30 bg-gray-100'
										: 'hover:border-black cursor-pointer',
									isSelected
										? 'border-black border-2 bg-gray-50'
										: 'border-gray-200',
								)}
							>
								<b className='text-sm'>{size}</b>
								<span className='text-[10px] text-muted-foreground'>
									{sizeMap[size] || '--'}
								</span>
							</button>
						)
					})}
				</div>

				{/* ПЕРЕДАЕМ ВЫБРАННЫЙ РАЗМЕР В КНОПКУ КОРЗИНЫ */}
				<AddToCard
					product={product}
					selectedVariantId={product.variants[variantIndex].id}
					selectedSize={selectedSize}
					onSuccess={() => setSelectedSize(undefined)}
				/>

				<ProductDescription description={product.description} />
				<ProductProperties properties={properties} />
			</div>
		</div>
	)
}

// ... Оставшиеся компоненты ProductDescription и ProductProperties без изменений

/* =======================
   DESCRIPTION
======================= */

const ProductDescription = ({ description }: { description: string }) => {
	return (
		<div className='space-y-4 text-sm'>
			<div>
				<h3 className='font-medium'>Описание</h3>
				<p className='mt-1'>{description}</p>
			</div>

			<div>
				<h3 className='font-medium'>Доставка</h3>
				<p>Бесплатная доставка при заказе от 30 000 сом</p>
			</div>

			<div>
				<h3 className='font-medium'>Возврат</h3>
				<p>Возврат в течение 14 дней</p>
			</div>
		</div>
	)
}

/* =======================
   PROPERTIES (GRID)
======================= */

const ProductProperties = ({
	properties,
}: {
	properties: ProductProperty[]
}) => {
	return (
		<div className='grid gap-3 text-sm'>
			{properties.map((item) => (
				<PropertyRow key={item.label} label={item.label} value={item.value} />
			))}
		</div>
	)
}

const PropertyRow = ({ label, value }: { label: string; value: string }) => {
	return (
		<div className='grid grid-cols-2 border-b pb-2'>
			<span className='text-muted-foreground'>{label}</span>
			<span className='text-right'>{value}</span>
		</div>
	)
}
