import type { GenderDTO } from '@/shared/lib/zod/gender.schema'
import type { CatalogItem } from '@/domain/product/types'
import type { GroupWithCountDTO } from '@/shared/lib/zod/groups.schema'

import { FiltersSidebar } from '@/features/filters/ui/filters-sidebar'
import { GenderToggle } from './gender-toggle'
import { ProductGrid } from './product-grid'

export function CatalogContent({
	data,
	groups,
	currentGender,
}: {
	data: CatalogItem[]
	groups: GroupWithCountDTO[]
	currentGender: GenderDTO
}) {
	return (
		<div className='flex flex-col md:flex-row gap-8'>
			<aside className='w-full md:w-64 shrink-0'>
				<FiltersSidebar groups={groups} />
			</aside>

			<div className='flex flex-col w-full'>
				<GenderToggle currentGender={currentGender} />

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
