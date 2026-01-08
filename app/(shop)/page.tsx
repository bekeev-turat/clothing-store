import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { z } from 'zod'

// Shared/UI
import { CatalogContent } from '@/features/catalog/ui'
import { Pagination } from '@/shared/ui'

// Utils/Actions
import { fetchCatalogProductsAction } from '@/actions/catalog.actions'
import { getProductGroupsWithCountAction } from '@/actions/groups.actions'
import { catalogParamsSchema } from '@/shared/lib/zod/catalog.schema'
import { GroupWithCountSchema } from '@/shared/lib/zod/groups.schema'
import { parsePage } from '@/shared/lib'
import { getProductBrandsAction } from '@/actions/get-brands.actions'

export const revalidate = 60

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
	searchParams,
}: Props): Promise<Metadata> {
	const params = await searchParams
	const pageValue = Array.isArray(params.page) ? params.page[0] : params.page
	const page = parsePage(pageValue)
	const baseUrl = 'https://beup.com'

	const canonical = page <= 1 ? `${baseUrl}/` : `${baseUrl}/?page=${page}`

	return {
		title: 'Главная | Магазин BeUp',
		alternates: { canonical },
	}
}

export default async function Home({ searchParams }: Props) {
	const rawParams = await searchParams
	
	if (!rawParams.gender) {
		redirect('/?gender=female')
	}
	const validatedParams = catalogParamsSchema.parse(rawParams)

	const [productsResponse, groupsResponse, brandsResponse] = await Promise.all([
		fetchCatalogProductsAction(validatedParams),
		getProductGroupsWithCountAction(validatedParams.gender),
		getProductBrandsAction(),
	])

	if (
		!brandsResponse ||
		!productsResponse ||
		!productsResponse.success ||
		!productsResponse.data
	) {
		return notFound()
	}

	const brands = brandsResponse.data
	const { data, meta } = productsResponse.data
	const groupsResult = z.array(GroupWithCountSchema).safeParse(groupsResponse)
	const groups = groupsResult.success ? groupsResult.data : []

	return (
		<div className='max-w-7xl mx-auto'>
			<CatalogContent
				brands={brands}
				data={data}
				groups={groups}
				currentGender={validatedParams.gender}
			/>

			{data.length > 0 && (
				<div className='mt-10'>
					<Suspense fallback={<div className='h-10' />}>
						<Pagination
							currentPage={meta.currentPage}
							totalPages={meta.totalPages}
						/>
					</Suspense>
				</div>
			)}
		</div>
	)
}
