import { useDebounce, useUpdateParams } from '@/shared/hooks'
import { useEffect, useState } from 'react'

// 1. Выносим логику управления поиском в отдельный хук
export function useSearchLogic() {
	const { searchParams, updateParam } = useUpdateParams()
	const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '')
	const debouncedSearch = useDebounce(searchTerm, 400)

	useEffect(() => {
		updateParam('q', debouncedSearch)
	}, [debouncedSearch])

	return {
		searchTerm,
		setSearchTerm,
		currentGender: searchParams.get('gender') ?? 'all',
		updateGender: (val: string) => updateParam('gender', val),
	}
}
