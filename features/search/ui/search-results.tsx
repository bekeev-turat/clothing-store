import { ProductSearchCard } from '@/features/search/ui/product-search-card'
import { EmptyState } from './empty-state'
import { type CatalogItem } from '@/domain/product/types'

interface SearchResultsProps {
	results?: CatalogItem[]
	isLoading: boolean
}

export function SearchResults({ results = [], isLoading }: SearchResultsProps) {
	return (
		<main className='max-w-6xl mx-auto p-6'>
			{/* Индикация количества */}
			{!isLoading && results.length > 0 && (
				<div className='mb-6 text-sm text-gray-500'>
					Найдено: {results.length}
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{results.map((item) => (
					<ProductSearchCard key={item.id} item={item} />
				))}
			</div>

			{/* Условие отрисовки пустого состояния */}
			{results.length === 0 && !isLoading && <EmptyState />}
		</main>
	)
}
