import { Plus } from 'lucide-react'

export const GroupsHeader = ({ count }: { count: number }) => (
	<div className='flex justify-between items-end'>
		<div>
			<h1 className='text-2xl font-bold text-gray-900'>Группы товаров</h1>
			<p className='text-sm text-gray-500'>Всего категорий: {count}</p>
		</div>
		<button className='bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition'>
			<Plus size={18} /> Создать группу
		</button>
	</div>
)
