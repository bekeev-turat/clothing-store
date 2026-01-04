import { AdminStatsRepository } from '@/repositories/admin/admin-stats.repository'
import { AdminStats } from '@/domain/admin/admin-stats.types'

export class AdminStatsService {
	static async getStats(): Promise<AdminStats> {
		const from = new Date()
		from.setMonth(from.getMonth() - 1)

		const [counts, monthlySales] = await Promise.all([
			AdminStatsRepository.getCounts(),
			AdminStatsRepository.getMonthlyOrdersTotal(from),
		])

		return {
			itemsCount: counts.items,
			usersCount: counts.users,
			groupsCount: counts.groups,
			monthlySales,
		}
	}
}
