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
			<div className='flex items-center justify-between'>
				<span className='text-sm font-medium'>Цвет:</span>
				<span className='text-sm text-muted-foreground'>
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
								'relative h-22 w-16 overflow-hidden rounded-md border-2 transition-all hover:opacity-80',
								isActive ? 'border-black' : 'border-transparent',
							)}
							title={variant.color}
						>
							<Image
								src={variant.imageUrl}
								alt={variant.color}
								fill
								sizes='300px'
								className='object-cover'
							/>
						</button>
					)
				})}
			</div>
		</div>
	)
}
