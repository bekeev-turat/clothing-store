// components/admin/AdminTable.tsx
interface Column<T> {
	header: string
	render: (item: T) => React.ReactNode
}

interface Props<T> {
	title: string
	data: T[]
	columns: Column<T>[]
	onDelete?: (id: string) => void
}

export function AdminTable<T extends { id: string }>({
	title,
	data,
	columns,
	onDelete,
}: Props<T>) {
	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>{title}</h1>
			<table className='w-full border-collapse'>
				<thead className='bg-gray-50 border-b'>
					<tr className='border-b'>
						{columns.map((col, i) => (
							<th
								key={i}
								className='px-6 py-4 text-sm font-semibold text-gray-600'
							>
								{col.header}
							</th>
						))}
						{onDelete && (
							<th className='px-6 py-4 text-sm font-semibold text-gray-600 text-right'>
								Действия
							</th>
						)}
					</tr>
				</thead>
				<tbody className='divide-y'>
					{data.map((item) => (
						<tr key={item.id} className='hover:bg-gray-50 transition'>
							{columns.map((col, i) => (
								<td key={i} className='px-6 py-4'>
									{col.render(item)}
								</td>
							))}
							{onDelete && (
								<td className='p-2'>
									<button
										onClick={() => onDelete(item.id)}
										className='text-red-500'
									>
										Удалить
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
