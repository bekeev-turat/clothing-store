'use client'

import { useState, useEffect } from 'react'
import { useUpdateParams } from '@/shared/hooks/use-update-params'
import { SearchToolbar } from '@/shared/ui'
import { useDebounce } from '@/shared/hooks/use-debounce'

export function UsersToolbar() {
	const { searchParams, updateParam } = useUpdateParams()

	const [searchTerm, setSearchTerm] = useState(searchParams.get('query') ?? '')

	const debouncedSearch = useDebounce(searchTerm, 400)

	useEffect(() => {
		updateParam('query', debouncedSearch)
	}, [debouncedSearch])

	return (
		<div className='flex gap-4 items-center'>
			<SearchToolbar
				placeholder='Поиск по имени или email'
				// Используем локальное значение для плавности
				searchValue={searchTerm}
				onSearchChange={(val) => setSearchTerm(val)}
				filterValue={searchParams.get('role') ?? 'ALL'}
				onFilterChange={(val) => updateParam('role', val === 'ALL' ? '' : val)}
				filterOptions={[
					{ value: 'ALL', label: 'Все роли' },
					{ value: 'ADMIN', label: 'ADMIN' },
					{ value: 'MEMBER', label: 'MEMBER' },
				]}
			/>
		</div>
	)
}
