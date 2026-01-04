'use client'

import { useState, useEffect, useMemo } from 'react'
import { useUpdateParams } from '@/shared/hooks/use-update-params'
import { SearchToolbar } from '@/shared/ui'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { GroupWithCount } from '@/domain/group/types'
import { FilterGroup, FilterOption } from '@/shared/ui/search-toolbar'

const GENDER_MAP: Record<string, string> = {
	male: 'Мужское',
	female: 'Женское',
	child: 'Детское',
	unisex: 'Унисекс',
}

export function ProductsToolbar({ groups }: { groups: GroupWithCount[] }) {
	const { searchParams, updateParam } = useUpdateParams()
	const [searchTerm, setSearchTerm] = useState(searchParams.get('query') ?? '')
	const debouncedSearch = useDebounce(searchTerm, 400)

	useEffect(() => {
		updateParam('query', debouncedSearch)
	}, [debouncedSearch])

	const formattedOptions = useMemo(() => {
		const result: (FilterOption | FilterGroup)[] = [
			{ value: 'ALL', label: 'Все товары' },
		]

		const groupedByGender = groups.reduce((acc, group) => {
			const gender = group.gender || 'unisex'
			if (!acc[gender]) acc[gender] = []
			acc[gender].push(group)
			return acc
		}, {} as Record<string, GroupWithCount[]>)

		Object.entries(groupedByGender).forEach(([gender, items]) => {
			result.push({
				label: GENDER_MAP[gender] || gender,
				options: items.map((g) => ({
					value: g.slug,
					label: `${g.title} (${g._count.items})`,
					disabled: g._count.items === 0,
				})),
			})
		})

		return result
	}, [groups])

	return (
		<div className='flex gap-4 items-center'>
			<SearchToolbar
				placeholder='Поиск по имени продукта...'
				searchValue={searchTerm}
				onSearchChange={(val) => setSearchTerm(val)}
				filterValue={searchParams.get('groupSlug') ?? 'ALL'}
				onFilterChange={(val) =>
					updateParam('groupSlug', val === 'ALL' ? '' : val)
				}
				filterOptions={formattedOptions}
			/>
		</div>
	)
}
