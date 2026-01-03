'use server'

import { AdminStatsService } from '@/services/admin/admin-stats.service'

export async function getAdminStats() {
	const stats = await AdminStatsService.getStats()

	return [
		{
			label: 'Всего товаров',
			value: stats.itemsCount.toLocaleString(),
			color: 'bg-blue-500',
		},
		{
			label: 'Пользователей',
			value: stats.usersCount.toLocaleString(),
			color: 'bg-green-500',
		},
		{
			label: 'Активных групп',
			value: stats.groupsCount.toLocaleString(),
			color: 'bg-purple-500',
		},
		{
			label: 'Продажи (мес)',
			value: `${stats.monthlySales.toLocaleString()} сом`,
			color: 'bg-orange-500',
		},
	]
}
