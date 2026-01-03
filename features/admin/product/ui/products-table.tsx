import { DataTable } from '@/shared/ui/data-table'
import { ProductRow } from './product-row'
import { ProductListItem } from '@/domain/product/types'

const COLUMNS = [
	{ header: 'Товар', key: 'name' },
	{ header: 'Группа', key: 'group' },
	{ header: 'Гендер', key: 'gender' },
	{ header: 'Цена', key: 'price' },
	{ header: 'Цвета', key: 'variants' },
	{ header: 'Действия', key: 'actions', className: 'text-right' },
]

export const ProductsTable = ({
	products,
}: {
	products: ProductListItem[]
}) => (
	<DataTable
		items={products}
		columns={COLUMNS}
		renderRow={(product) => <ProductRow key={product.id} product={product} />}
		emptyText='Товары не найдены'
	/>
)
