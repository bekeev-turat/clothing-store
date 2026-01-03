// @/shared/ui/search/search-toolbar.tsx
import { Search, Loader2 } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Input,
} from '@/shared/ui'

interface FilterOption {
	value: string
	label: string
}

interface SearchToolbarProps {
	placeholder?: string
	searchValue: string
	onSearchChange: (value: string) => void
	filterValue: string
	onFilterChange: (value: string) => void
	filterOptions?: FilterOption[]
	isLoading?: boolean
}

export const SearchToolbar = ({
	placeholder = 'Поиск...',
	searchValue,
	onSearchChange,
	filterValue,
	onFilterChange,
	filterOptions,
	isLoading,
}: SearchToolbarProps) => {
	return (
		<div className='flex flex-col md:flex-row gap-3 w-full'>
			<div className='relative flex-grow'>
				<Input
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => onSearchChange(e.target.value)}
					className='pl-10 h-[52px] rounded-xl bg-white focus-visible:ring-black transition-all'
				/>
				<div className='absolute left-3 top-1/2 -translate-y-1/2'>
					{isLoading ? (
						<Loader2 className='w-4 h-4 text-gray-400 animate-spin' />
					) : (
						<Search className='text-gray-400 w-4 h-4' />
					)}
				</div>
			</div>

			{filterOptions && (
				<Select value={filterValue} onValueChange={onFilterChange}>
					<SelectTrigger className='w-full md:w-56 h-[52px] rounded-xl bg-white'>
						<SelectValue placeholder='Категория' />
					</SelectTrigger>
					<SelectContent>
						{filterOptions.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	)
}
