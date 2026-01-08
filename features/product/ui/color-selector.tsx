import { cn } from '@/shared/lib/utils'
import Image from 'next/image'

interface VariantSummary {
	id: string
	color: string
	imageUrl: string
}

interface ColorSelectorProps {
	variants: VariantSummary[]
	currentIndex: number
	onChange: (index: number) => void
}

export const ColorSelector = ({
	variants,
	currentIndex,
	onChange,
}: ColorSelectorProps) => {
	return (
		<div className='space-y-3'>
			<div className='flex items-center justify-between text-sm leading-none'>
				<span className='font-medium'>Цвет</span>
				<span className='text-muted-foreground'>
					{variants[currentIndex]?.color}
				</span>
			</div>

			<div className='flex flex-wrap gap-2'>
				{variants.map((variant, index) => {
					const isActive = index === currentIndex

					return (
						<button
							key={variant.id}
							type='button'
							onClick={() => onChange(index)}
							className={cn(
								// Базовые стили в стиле shadcn
								'relative h-20 w-16 overflow-hidden rounded-md border border-input bg-background transition-all',
								'hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
								// Стили активного состояния
								isActive
									? 'ring-2 ring-primary ring-offset-2 border-transparent'
									: 'hover:border-muted-foreground/50',
							)}
							title={variant.color}
						>
							<Image
								src={variant.imageUrl}
								alt={variant.color}
								fill
								sizes='(max-width: 768px) 64px, 80px'
								className='object-cover'
							/>
						</button>
					)
				})}
			</div>
		</div>
	)
}
