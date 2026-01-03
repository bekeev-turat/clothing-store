import { motion } from 'framer-motion'
import { PackageSearch } from 'lucide-react'
export const EmptyState = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		className='flex flex-col items-center justify-center py-32 text-center'
	>
		<div className='bg-white shadow-sm border p-8 rounded-full mb-6'>
			<PackageSearch className='w-16 h-16 text-gray-300' />
		</div>
		<h3 className='text-2xl font-bold text-gray-900'>Ничего не нашли</h3>
		<p className='text-gray-500 mt-2 max-w-xs'>
			Попробуйте смягчить условия поиска или выбрать другую категорию.
		</p>
	</motion.div>
)
