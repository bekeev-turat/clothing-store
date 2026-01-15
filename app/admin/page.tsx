import { getAdminStats } from '@/actions/admin/get-admin-stats.action'
import { AdminPageHeader } from '@/shared/ui/admin/admin-header'
import { StatCard } from '@/shared/ui/admin/stat-card'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
	const { data: stats } = await getAdminStats()
	return (
		<div className='space-y-6'>
			<AdminPageHeader
				title='Добро пожаловать в админ-панель'
				description='Здесь вы можете управлять товарами, категориями и пользователями вашего магазина.'
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{stats.map((stat) => (
					<StatCard key={stat.label} {...stat} />
				))}
			</div>
		</div>
	)
}
