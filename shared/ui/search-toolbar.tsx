import { Search, Loader2 } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Input,
	SelectGroup,
	SelectLabel,
} from '@/shared/ui'

export interface FilterOption {
	value: string
	label: string
	disabled?: boolean
}

export interface FilterGroup {
	label: string
	options: FilterOption[]
}

interface SearchToolbarProps {
	placeholder?: string
	searchValue: string
	onSearchChange: (value: string) => void
	filterValue: string
	onFilterChange: (value: string) => void
	filterOptions?: (FilterOption | FilterGroup)[]
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
					className='pl-10 h-[52px] rounded-xl bg-white focus-visible:ring-black'
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
						{filterOptions.map((item) => {
							if ('options' in item) {
								return (
									<SelectGroup key={item.label}>
										<SelectLabel className='text-muted-foreground text-[10px] uppercase font-bold px-2 py-1.5'>
											{item.label}
										</SelectLabel>
										{item.options.map((opt) => (
											<SelectItem
												key={opt.value}
												value={opt.value}
												disabled={opt.disabled}
											>
												{opt.label}
											</SelectItem>
										))}
									</SelectGroup>
								)
							}
							return (
								<SelectItem
									key={item.value}
									value={item.value}
									disabled={item.disabled}
								>
									{item.label}
								</SelectItem>
							)
						})}
					</SelectContent>
				</Select>
			)}
		</div>
	)
}
