'use client'

import { useState, useEffect } from 'react'
import { useUpdateParams } from '@/shared/hooks/use-update-params'
import { SearchToolbar } from '@/shared/ui'
import { useDebounce } from '@/shared/hooks/use-debounce'

export function ProductsToolbar({
	groups,
}: {
	groups: { id: string; title: string }[]
}) {
	const { searchParams, updateParam } = useUpdateParams()

	const [searchTerm, setSearchTerm] = useState(searchParams.get('query') ?? '')

	const debouncedSearch = useDebounce(searchTerm, 400)

	useEffect(() => {
		updateParam('query', debouncedSearch)
	}, [debouncedSearch])

	return (
		<div className='flex gap-4 items-center'>
			<SearchToolbar
				placeholder='Поиск по имени продукта...'
				searchValue={searchTerm}
				onSearchChange={(val) => setSearchTerm(val)}
				filterValue={searchParams.get('groupId') ?? 'ALL'}
				onFilterChange={(val) =>
					updateParam('groupId', val === 'ALL' ? '' : val)
				}
				filterOptions={[
					{ value: 'ALL', label: 'Все товары' },
					...groups.map((group) => ({ value: group.id, label: group.title })),
				]}
			/>
		</div>
	)
}
