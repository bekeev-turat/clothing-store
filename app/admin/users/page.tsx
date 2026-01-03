import { UserFilters } from '@/features/admin/user/model/types'
import { UsersTable, UsersToolbar } from '@/features/admin/user/ui'
import { UsersHeader } from '@/features/admin/user/ui/users-header'
import { userService } from '@/services/admin/user.service'

export default async function AdminUsersPage({
	searchParams,
}: {
	searchParams: UserFilters
}) {
	const params = await searchParams
	const users = await userService.getUsersList({
		query: params.query,
		role: params.role,
	})

	return (
		<div className='space-y-6'>
			<UsersHeader count={users.length} />
			<UsersToolbar />
			<UsersTable users={users} />
		</div>
	)
}
