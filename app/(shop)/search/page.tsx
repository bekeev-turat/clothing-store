export const dynamic = 'force-dynamic'

import { useSearchLogic, useSearchItems } from '@/features/search/hooks/'
import { SearchHeader, SearchResults } from '@/features/search/ui'

export default function SearchPage() {
	const { searchTerm, setSearchTerm, currentGender, updateGender } =
		useSearchLogic()
	const { results, isLoading } = useSearchItems()

	return (
		<div className='min-h-screen bg-[#f9f9f9]'>
			<SearchHeader
				searchValue={searchTerm}
				onSearchChange={setSearchTerm}
				gender={currentGender}
				onGenderChange={updateGender}
				isLoading={isLoading}
			/>
			<SearchResults results={results?.data ?? []} isLoading={isLoading} />
		</div>
	)
}
