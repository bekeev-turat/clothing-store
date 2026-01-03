export const StatCard = ({
	label,
	value,
	color,
}: {
	label: string
	value: string
	color: string
}) => (
	<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
		<p className='text-sm text-gray-500 font-medium'>{label}</p>
		<p className='text-3xl font-bold mt-2'>{value}</p>
		<div className={`h-1 w-12 mt-4 rounded ${color}`} />
	</div>
)
