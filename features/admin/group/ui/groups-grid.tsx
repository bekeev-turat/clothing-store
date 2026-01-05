import { IDetailedGroups } from '@/services/group.service'
import { GroupCard } from './group-card'

export const GroupsGrid = ({ groups }: { groups: IDetailedGroups }) => (
	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
		{groups.map((group) => (
			<GroupCard key={group.id} group={group} />
		))}

		{groups.length === 0 && (
			<div className='col-span-full p-12 bg-gray-50 rounded-xl border-2 border-dashed text-center text-gray-400'>
				Группы еще не созданы.
			</div>
		)}
	</div>
)
