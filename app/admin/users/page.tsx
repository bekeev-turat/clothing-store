import { getUsersAction } from '@/actions/account.actions'
import { getSession } from '@/domain/auth/get-session'
import { UsersTable, UsersToolbar } from '@/features/admin/user/ui'
import { UsersHeader } from '@/features/admin/user/ui/users-header'
import { UserFilters } from '@/shared/lib/zod/account.schema'

export default async function AdminUsersPage({
	searchParams,
}: {
	searchParams: UserFilters
}) {
	const params = await searchParams
	const session = await getSession()
	const users = await getUsersAction(session?.user.id || '', {
		query: params.query,
		role: params.role,
	})

	return (
		<div className='space-y-6'>
			<UsersHeader count={users.data.length} />
			<UsersToolbar />
			<UsersTable users={users.data} />
		</div>
	)
}
