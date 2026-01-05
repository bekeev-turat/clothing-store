'use client'

import Link from 'next/link'
import { FolderTree, Pencil, Hash, UserCircle } from 'lucide-react'
import { ItemGender } from '@/prisma/generated/enums'
import { ROUTE_MAP } from '@/shared/config/routes'
import { type IDetailedGroupsItem } from '@/services/group.service'

const genderLabels: Record<ItemGender, string> = {
	[ItemGender.male]: 'Мужское',
	[ItemGender.female]: 'Женское',
	[ItemGender.child]: 'Детское',
	[ItemGender.unisex]: 'Унисекс',
}

export const GroupCard = ({ group }: { group: IDetailedGroupsItem }) => {
	return (
		<div className='bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition'>
			<div className='flex justify-between items-start mb-4'>
				<div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
					<FolderTree size={24} />
				</div>
				<button className='text-gray-400 hover:text-blue-600 transition'>
					<Pencil size={18} />
				</button>
			</div>

			<h3 className='text-lg font-bold text-gray-900 mb-1'>{group.title}</h3>

			<div className='space-y-2 mb-4'>
				<div className='flex items-center gap-2 text-sm text-gray-500'>
					<Hash size={14} />
					<span>
						Slug: <code className='text-blue-600'>{group.slug}</code>
					</span>
				</div>
				<div className='flex items-center gap-2 text-sm text-gray-500'>
					<UserCircle size={14} />
					<span>
						Гендер:{' '}
						{group.gender
							? genderLabels[group.gender as ItemGender]
							: 'Не указан'}
					</span>
				</div>
			</div>

			<div className='pt-4 border-t flex justify-between items-center'>
				<div className='text-sm'>
					<span className='font-bold text-gray-900'>{group._count.items}</span>
					<span className='text-gray-500 ml-1'>товаров</span>
				</div>
				<Link
					href={`${ROUTE_MAP.admin.products}?groupId=${group.id}`}
					className='text-xs text-blue-600 font-medium hover:underline'
				>
					Смотреть товары →
				</Link>
			</div>
		</div>
	)
}
