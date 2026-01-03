import { cn } from '@/shared/lib/utils'
import { ItemSize } from '@/prisma/generated/enums'

const SIZE_LABELS: Record<string, number> = { S: 44, M: 46, L: 48, XL: 50, XXL: 52 }

interface Props {
	availableSizes: ItemSize[]
	stock: Record<ItemSize, number>
	selectedSize?: ItemSize
	onSelect: (size: ItemSize) => void
}

export const SizeSelector = ({ availableSizes, stock, selectedSize, onSelect }: Props) => (
	<div className='flex flex-wrap gap-3'>
		{availableSizes.map((size) => {
			const isOutOfStock = (stock[size] || 0) === 0
			const isSelected = selectedSize === size

			return (
				<button
					key={size}
					disabled={isOutOfStock}
					onClick={() => onSelect(size)}
					className={cn(
						'flex h-14 w-14 flex-col items-center justify-center rounded-md border transition-all',
						isOutOfStock ? 'opacity-30 bg-gray-100 cursor-not-allowed' : 'hover:border-black',
						isSelected ? 'border-black border-2 bg-gray-50' : 'border-gray-200'
					)}
				>
					<b className='text-sm'>{size}</b>
					<span className='text-[10px] text-muted-foreground'>{SIZE_LABELS[size] || '--'}</span>
				</button>
			)
		})}
	</div>
)
