import {
	getAdminProductsAction,
	getProductGroupOptionsAction,
} from '@/actions/catalog.actions'
import {
	ProductsHeader,
	ProductsTable,
	ProductsToolbar,
} from '@/features/admin/product/ui'
import { Pagination } from '@/shared/ui'

export default async function AdminProductsPage({
	searchParams,
}: {
	searchParams: Promise<{
		query?: string
		groupId?: string
		pageIndex?: string
	}>
}) {
	const params = await searchParams

	const [{ data, meta }, { groups }] = await Promise.all([
		getAdminProductsAction({
			search: params.query,
			groupId: params.groupId,
			pageIndex: Number(params.pageIndex) || 0,
			pageSize: 50,
		}),
		getProductGroupOptionsAction(),
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
