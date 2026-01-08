import { getAdminProductsAction } from '@/actions/catalog.actions'
import { getProductGroupsWithCountAction } from '@/actions/groups.actions'
import {
	ProductsHeader,
	ProductsTable,
	ProductsToolbar,
} from '@/features/admin/product/ui'
import { Pagination } from '@/shared/ui'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Админка просмотра товаров',
}

export default async function AdminProductsPage({
	searchParams,
}: {
	searchParams: Promise<{
		query?: string
		groupSlug?: string
		pageIndex?: string
	}>
}) {
	const params = await searchParams

	const [{ data, meta }, groups] = await Promise.all([
		getAdminProductsAction({
			search: params.query,
			groupSlug: params.groupSlug,
			pageIndex: Number(params.pageIndex) || 0,
			pageSize: 20,
		}),
		getProductGroupsWithCountAction(),
	])

	return (
		<div className='space-y-6'>
			<ProductsHeader count={meta.totalItems} />
			<ProductsToolbar groups={groups} />
			<ProductsTable products={data} />

			<Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} />
		</div>
	)
}
