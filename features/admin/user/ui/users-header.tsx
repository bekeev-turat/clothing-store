export const UsersHeader = ({ count }: { count: number }) => {
	return (
		<div className='flex justify-between items-end'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900'>
					Управление доступом
				</h1>
				<p className='text-sm text-gray-500'>Всего: {count}</p>
			</div>
		</div>
	)
}
