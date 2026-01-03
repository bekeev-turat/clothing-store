interface Property {
	label: string
	value: string
}

interface ProductInfoProps {
	description: string
	properties: Property[]
}

export const ProductInfo = ({ description, properties }: ProductInfoProps) => {
	return (
		<div className='space-y-8 border-t pt-6'>
			<section className='space-y-2'>
				<h3 className='font-semibold text-sm uppercase tracking-wider'>
					Описание
				</h3>
				<p className='text-sm text-gray-600 leading-relaxed'>{description}</p>
			</section>

			<section className='space-y-3'>
				<h3 className='font-semibold text-sm uppercase tracking-wider'>
					Характеристики
				</h3>
				<div className='grid gap-y-2'>
					{properties.map((prop) => (
						<PropertyRow key={prop.label} {...prop} />
					))}
				</div>
			</section>

			<section className='grid gap-4 pt-4 border-t text-xs text-muted-foreground'>
				<div className='flex gap-2'>
					<span className='font-medium text-black'>Доставка:</span>
					<span>Бесплатная доставка при заказе от 30 000 сом</span>
				</div>
				<div className='flex gap-2'>
					<span className='font-medium text-black'>Возврат:</span>
					<span>Возврат в течение 14 дней в оригинальной упаковке</span>
				</div>
			</section>
		</div>
	)
}

/**
 * Выделенный компонент для строки характеристики (DIP - зависим от абстракции Property)
 */
const PropertyRow = ({ label, value }: Property) => {
	if (!value) return null

	return (
		<div className='flex justify-between items-baseline border-b border-dashed border-gray-200 pb-1 text-sm'>
			<span className='text-muted-foreground bg-white pr-2'>{label}</span>
			<span className='text-right font-medium pl-2 bg-white text-gray-900'>
				{value}
			</span>
		</div>
	)
}
