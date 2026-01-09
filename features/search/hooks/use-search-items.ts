'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { PaginatedResponse } from '@/domain/common/paginated-response'
import { TransformedProductCatalog } from '@/domain/product/types'
import { fetchCatalogProductsAction } from '@/actions/catalog.actions'

type SearchResults = PaginatedResponse<TransformedProductCatalog>

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
				const { data } = await fetchCatalogProductsAction({
					search: query,
					gender,
				})
				setResults(data || null)
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
