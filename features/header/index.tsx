import { getProductGroupsWithCountAction } from '@/actions/groups.actions'
import { Navbar } from './navbar'
import { GroupWithCountSchema } from '@/shared/lib/zod/groups.schema'
import { z } from 'zod'

export const Header = async () => {
	const response = await getProductGroupsWithCountAction()

	const result = response.success
		? z.array(GroupWithCountSchema).safeParse(response.data)
		: null

	const groups = result?.success ? result.data : []

	return (
		<header className='py-4 shadow-md bg-white relative z-50'>
			<Navbar groups={groups} />
		</header>
	)
}
