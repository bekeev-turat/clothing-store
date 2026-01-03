export const revalidate = 60

import { ProductGrid } from '@/features/catalog/ui/product-grid'
import { parsePage } from '@/shared/lib'
import { Pagination } from '@/shared/ui'
import { Metadata } from 'next'
import { fetchCatalogProductsAction } from '@/actions/catalog.actions'
import { catalogParamsSchema } from '@/actions/catalog.schema'
import { Suspense } from 'react'
import { FiltersSidebar } from '@/features/filters/ui/filters-sidebar'

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
	searchParams,
}: Props): Promise<Metadata> {
	const params = await searchParams

	// Если params.page — массив, берем первый элемент, иначе саму строку
	const pageValue = Array.isArray(params.page) ? params.page[0] : params.page
	const page = parsePage(pageValue)

	const baseUrl = 'https://beup.com'
	const isFirstPage = page === 1

	const canonical = isFirstPage ? `${baseUrl}/` : `${baseUrl}/?page=${page}`

	return {
		alternates: {
			canonical,
		},
	}
}

export default async function Home({ searchParams }: Props) {
	const rawParams = await searchParams

	const validatedParams = catalogParamsSchema.parse(rawParams)

	console.log(validatedParams)
	const key = JSON.stringify(validatedParams)
	const response = await fetchCatalogProductsAction(validatedParams)

	if (!response.success || !response.data) {
		return (
			<div className='p-10 text-center text-red-500'>
				Ошибка загрузки товаров
			</div>
		)
	}

	const { data, meta } = response.data

	return (
		<div className='max-w-7xl mx-auto' key={key}>
			<h1 className='antialiased text-4xl font-semibold my-7'>BeUp</h1>
			<div className='flex flex-col md:flex-row gap-8'>
				<aside className='w-full md:w-64 shrink-0'>
					<FiltersSidebar />
				</aside>

				{data.length > 0 ? (
					<div>
						<ProductGrid items={data} />

						<div className='mt-10'>
							<Suspense fallback={<div className='h-10' />}>
								<Pagination
									currentPage={meta.currentPage}
									totalPages={meta.totalPages}
								/>
							</Suspense>
						</div>
					</div>
				) : (
					<div className='text-center py-20 text-gray-500'>
						Товары не найдены
					</div>
				)}
			</div>
		</div>
	)
}
