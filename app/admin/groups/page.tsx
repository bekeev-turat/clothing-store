import { getProductGroupsWithCountAction } from '@/actions/groups.actions'
import { GroupsHeader, GroupsGrid } from '@/features/admin/group/ui'
import { LoadingPage } from '@/shared/ui/loading'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Админка просмотра групп',
}

export default async function AdminGroupsPage() {
	const { data: groups } = await getProductGroupsWithCountAction()
	if (!groups) {
		return <LoadingPage />
	}

	return (
		<div className='space-y-6'>
			<GroupsHeader count={groups.length} />
			<GroupsGrid groups={groups} />
		</div>
	)
}
