import { TransformedProduct } from '@/domain/product/types'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui'

interface ProductInfoProps {
	product: TransformedProduct
	color: string
}

export const ProductInfo = ({ product, color }: ProductInfoProps) => {
	return (
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='description'>
				<AccordionTrigger className='text-sm font-semibold'>
					Описание
				</AccordionTrigger>
				<AccordionContent className='leading-relaxed text-muted-foreground'>
					{product.description}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='details'>
				<AccordionTrigger className='text-sm font-semibold'>
					Характеристики
				</AccordionTrigger>
				<AccordionContent>
					<dl className='space-y-2'>
						{[
							{ label: 'Бренд', value: product.brand },
							{ label: 'Цвет', value: color },
							{ label: 'Состав', value: product.composition?.join(', ') },
							{ label: 'Артикул', value: product.code },
						].map((item) => (
							<div key={item.label} className='flex justify-between text-sm'>
								<dt className='text-muted-foreground'>{item.label}</dt>
								<dd className='font-medium text-foreground'>
									{item.value || '—'}
								</dd>
							</div>
						))}
					</dl>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
