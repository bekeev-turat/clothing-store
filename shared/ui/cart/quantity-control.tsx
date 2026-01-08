'use client'

import { Minus, Plus } from 'lucide-react'

interface QuantityControlProps {
	value: number
	onChange: (nextValue: number) => void
	min?: number
	max?: number
}

export const QuantityControl = ({
	value,
	onChange,
	min = 1,
	max,
}: QuantityControlProps) => (
	<div className='flex items-center h-10 border border-input rounded-md bg-background'>
		<button
			onClick={() => value > min && onChange(value - 1)}
			className='h-full px-3 text-muted-foreground hover:text-foreground transition-colors'
		>
			<Minus size={14} />
		</button>
		<span className='w-8 text-center text-sm font-medium tabular-nums'>
			{value}
		</span>
		<button
			onClick={() => (!max || value < max) && onChange(value + 1)}
			className='h-full px-3 text-muted-foreground hover:text-foreground transition-colors'
		>
			<Plus size={14} />
		</button>
	</div>
)
