'use server'

import { AdminStatsService } from '@/services/admin/admin-stats.service'
import { ensureAdmin } from '@/shared/lib/auth-utils'

export async function getAdminStats() {
	try {
		await ensureAdmin()

		const stats = await AdminStatsService.getStats()

		return {
			success: true,
			data: [
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
			],
		}
	} catch (error) {
		console.error('[GET_ADMIN_STATS_ERROR]:', error)

		return {
			success: false,
			error: 'Не удалось загрузить статистику',
			data: [],
		}
	}
}
