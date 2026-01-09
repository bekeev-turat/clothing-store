import { ProductCard } from './product-card'
import { TransformedProductCatalog } from '@/domain/product/types'

export function ProductGrid({ items }: { items: TransformedProductCatalog[] }) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
			{items.map((item) => (
				<ProductCard key={item.id} item={item} />
			))}
		</div>
	)
}
