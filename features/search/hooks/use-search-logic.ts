'use client'

import { useDebounce, useUpdateParams } from '@/shared/hooks'
import { useEffect, useState } from 'react'

export function useSearchLogic() {
	const { searchParams, updateParam } = useUpdateParams()
	const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '')
	const debouncedSearch = useDebounce(searchTerm, 400)

	useEffect(() => {
		updateParam('q', debouncedSearch)
	}, [debouncedSearch, updateParam])

	return {
		searchTerm,
		setSearchTerm,
		currentGender: searchParams.get('gender') ?? 'all',
		updateGender: (val: string) => updateParam('gender', val),
	}
}
