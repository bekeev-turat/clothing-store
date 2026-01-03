import Link from 'next/link'
import { ROUTE_MAP } from '@/shared/config/routes'
import { GENDER_OPTIONS } from '@/shared/const/gender'
import { GroupWithCountDTO } from '../lib/zod/groups.schema'

export const NavMenu = ({ groups }: { groups: GroupWithCountDTO[] }) => {
	return (
		<div className='absolute left-0 top-full w-full bg-white shadow-2xl border-t opacity-0 invisible translate-y-2 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-300 z-[100]'>
			<div className='max-w-7xl mx-auto grid grid-cols-3 gap-12 p-10'>
				{GENDER_OPTIONS.map((section) => (
					<div key={section.value}>
						<p className='font-black text-primary text-xl mb-4 uppercase tracking-wider border-b-2 border-primary/10 pb-2'>
							{section.label}
						</p>
						<ul className='space-y-3'>
							{groups
								.filter((g) => g.gender === section.value)
								.map((group) => (
									<li key={group.id}>
										<Link
											href={ROUTE_MAP.catalog.detail(group.slug)}
											className='text-lg hover:text-primary transition-all flex justify-between items-center group/link'
										>
											<span>{group.title}</span>
											<span className='text-xs text-gray-400 group-hover/link:text-primary'>
												{group._count.items}
											</span>
										</Link>
									</li>
								))}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}
