import { Search } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'

interface SearchFormProps {
	onSearch: (formData: FormData) => void
	onGenderChange: (value: string) => void
	isLoading: boolean
}

export const SearchForm = ({
	onSearch,
	onGenderChange,
	isLoading,
}: SearchFormProps) => (
	<form action={onSearch} className='flex flex-col md:flex-row gap-3'>
		<div className='relative grow'>
			<input
				name='query'
				type='text'
				placeholder='Название, бренд или тег...'
				className='w-full border-gray-200 bg-gray-50 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-black outline-none text-black'
			/>
			<Search className='absolute left-3 top-3.5 text-gray-400 w-4 h-4' />
		</div>

		<div className='relative'>
			<Select name='gender' onValueChange={onGenderChange}>
				<SelectTrigger className='w-full md:w-48 h-[52px] bg-gray-50 border-gray-200 rounded-xl'>
					<SelectValue placeholder='Все категории' />
				</SelectTrigger>
				<SelectContent className='rounded-xl'>
					<SelectItem value='all'>Все категории</SelectItem>
					<SelectItem value='male'>Мужское</SelectItem>
					<SelectItem value='female'>Женское</SelectItem>
					<SelectItem value='child'>Детское</SelectItem>
				</SelectContent>
			</Select>
		</div>

		<button
			type='submit'
			disabled={isLoading}
			className='bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-zinc-800 disabled:opacity-50'
		>
			{isLoading ? 'Поиск...' : 'Найти'}
		</button>
	</form>
)
