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
}: QuantityControlProps) => {
	const decrease = () => {
		if (value <= min) return
		onChange(value - 1)
	}

	const increase = () => {
		if (max && value >= max) return
		onChange(value + 1)
	}

	return (
		<div className='inline-flex items-center border rounded-lg overflow-hidden'>
			<button
				type='button'
				onClick={decrease}
				className='px-3 py-2 hover:bg-gray-100 transition'
				aria-label='Decrease quantity'
			>
				<Minus size={16} />
			</button>

			<span className='px-4 text-sm font-medium select-none'>{value}</span>

			<button
				type='button'
				onClick={increase}
				className='px-3 py-2 hover:bg-gray-100 transition'
				aria-label='Increase quantity'
			>
				<Plus size={16} />
			</button>
		</div>
	)
}
