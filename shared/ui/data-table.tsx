import { ReactNode } from 'react'

interface DataTableProps<T> {
	items: T[]
	columns: {
		header: string
		key: string
		className?: string
	}[]
	renderRow: (item: T) => ReactNode
	emptyText?: string
}

export function DataTable<T>({
	items,
	columns,
	renderRow,
	emptyText = 'Данных пока нет',
}: DataTableProps<T>) {
	return (
		<div className='bg-white rounded-xl shadow-sm border overflow-hidden'>
			<table className='w-full text-left border-collapse'>
				<thead className='bg-gray-50 border-b'>
					<tr>
						{columns.map((col) => (
							<th
								key={col.key}
								className={`px-6 py-4 text-sm font-semibold text-gray-600 ${
									col.className || ''
								}`}
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='divide-y'>
					{items.map((item) => renderRow(item))}
				</tbody>
			</table>

			{items.length === 0 && (
				<div className='p-10 text-center text-gray-500'>{emptyText}</div>
			)}
		</div>
	)
}
