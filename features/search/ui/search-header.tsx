import { Search } from 'lucide-react'
import { SearchToolbar } from '@/shared/ui'
import { GENDER_OPTIONS } from '@/shared/const/gender'

interface SearchHeaderProps {
	searchValue: string
	onSearchChange: (val: string) => void
	gender: string
	onGenderChange: (val: string) => void
	isLoading: boolean
}

const GENDER_OPTIONS_WITH_ALL = [
	{ value: 'all', label: 'Все категории' },
	...GENDER_OPTIONS,
]

export function SearchHeader({
	searchValue,
	onSearchChange,
	gender,
	onGenderChange,
	isLoading,
}: SearchHeaderProps) {
	return (
		<div className='bg-white border-b sticky top-0 z-20'>
			<div className='max-w-6xl mx-auto px-6 py-8'>
				<h1 className='text-3xl font-extrabold mb-6 tracking-tight flex items-center gap-3'>
					<Search className='w-8 h-8' /> Поиск одежды
				</h1>

				<SearchToolbar
					placeholder='Название, бренд или стиль...'
					searchValue={searchValue}
					onSearchChange={onSearchChange}
					filterValue={gender}
					onFilterChange={onGenderChange}
					isLoading={isLoading}
					filterOptions={GENDER_OPTIONS_WITH_ALL}
				/>
			</div>
		</div>
	)
}
