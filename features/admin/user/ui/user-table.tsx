import { Account } from '@/prisma/generated/client'
import { DataTable } from '@/shared/ui/data-table'
import { UserRow } from './user-row'

const COLUMNS = [
	{ header: 'Пользователь', key: 'user' },
	{ header: 'Роль', key: 'role' },
	{ header: 'Email', key: 'email' },
	{ header: 'Дата', key: 'date' },
	{ header: 'Действия', key: 'actions', className: 'text-right' },
]

export const UsersTable = ({ users }: { users: Account[] }) => (
	<DataTable
		items={users}
		columns={COLUMNS}
		renderRow={(user) => <UserRow key={user.id} user={user} />}
		emptyText='Пользователи не найдены'
	/>
)
