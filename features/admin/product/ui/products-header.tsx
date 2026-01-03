import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ROUTE_MAP } from '@/shared/config/routes'

export const ProductsHeader = ({ count }: { count: number }) => (
	<div className='flex justify-between items-end'>
		<div>
			<h1 className='text-2xl font-bold text-gray-900'>Управление товарами</h1>
			<p className='text-sm text-gray-500'>Всего позиций: {count}</p>
		</div>
		<Link
			href={`${ROUTE_MAP.admin.products}/create`}
			className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition'
		>
			<Plus size={18} /> Добавить товар
		</Link>
	</div>
)
