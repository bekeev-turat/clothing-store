import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchItemsAction } from '@/actions/get-items-search'
import { PaginatedResponse } from '@/domain/common/paginated-response'
import { CatalogItem } from '@/domain/product/types'

type SearchResults = PaginatedResponse<CatalogItem>

export function useSearchItems() {
	const searchParams = useSearchParams()
	const [results, setResults] = useState<SearchResults | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// Берем значения из URL
	const query = searchParams.get('q') || ''
	const gender = searchParams.get('gender') || 'all'

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const formData = new FormData()
				formData.append('query', query)
				if (gender !== 'all') formData.append('gender', gender)

				const data = await searchItemsAction(formData)
				setResults(data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [query, gender])

	return { results, isLoading }
}
