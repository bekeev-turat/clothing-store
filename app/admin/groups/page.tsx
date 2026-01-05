import { getProductGroupsWithCountAction } from '@/actions/groups.actions'
import { GroupsHeader, GroupsGrid } from '@/features/admin/group/ui'

export default async function AdminGroupsPage() {
	const groups = await getProductGroupsWithCountAction()

	return (
		<div className='space-y-6'>
			<GroupsHeader count={groups.length} />
			<GroupsGrid groups={groups} />
		</div>
	)
}
