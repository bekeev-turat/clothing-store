import type { GenderDTO } from '@/shared/lib/zod/gender.schema'
import type { TransformedProductCatalog } from '@/domain/product/types'
import type { GroupWithCountDTO } from '@/shared/lib/zod/groups.schema'

import { GenderToggle } from './gender-toggle'
import { ProductGrid } from './product-grid'
import { FiltersToolbar } from '@/features/filters/ui/filters-sidebar'

export function CatalogContent({
	data,
	brands,
	groups,
	currentGender,
}: {
	brands: string[] | null | undefined
	data: TransformedProductCatalog[]
	groups: GroupWithCountDTO[]
	currentGender: GenderDTO
}) {
	return (
		<div className=' md:flex-row gap-8'>
			<div className='flex flex-col w-full'>
				<GenderToggle currentGender={currentGender} />
				<FiltersToolbar availableBrands={brands} groups={groups} />
				<span className='mb-20 '></span>
				{data.length > 0 ? (
					<ProductGrid items={data} />
				) : (
					<div className='text-center py-20 text-gray-500'>
						Товары не найдены
					</div>
				)}
			</div>
		</div>
	)
}
