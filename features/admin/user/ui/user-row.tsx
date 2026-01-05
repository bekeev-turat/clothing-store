// features/admin/user/ui/user-row.tsx
'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Mail, MoreVertical, Trash2, UserIcon, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

import {
	ConfirmModal,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui'
import { RoleBadge } from './role-badge'
import { Account, UserRole } from '@/prisma/generated/client'
// import { deleteUserAction } from '@/actions/admin/delete-user.action'
import { updateUserRole } from '@/actions/admin/update-role.action'

interface UserRowProps {
	user: Account
}

export const UserRow = ({ user }: UserRowProps) => {
	const [isPending, startTransition] = useTransition()

	const [isDeleting, setIsDeleting] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	// const onDelete = () =>
	// 	startTransition(async () => {
	// 		const res = await deleteUserAction(user.id)
	// 		res.success
	// 			? toast.success('Удалено')
	// 			: toast.error(res.error || 'Ошибка удаления')
	// 	})

	const onChangeRole = (role: UserRole) =>
		startTransition(async () => {
			try {
				await updateUserRole(user.id, role)
				toast.success('Роль обновлена')
			} catch (e) {
				toast.error('Ошибка обновления')
			}
		})

	return (
		<>
			<tr className='hover:bg-gray-50 transition border-b'>
				<td className='px-6 py-4'>
					<div className='flex items-center gap-3'>
						{user.avatar ? (
							<Image
								width={32}
								height={32}
								src={user.avatar}
								alt={user.username}
								className='rounded-full object-cover'
							/>
						) : (
							<div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
								<UserIcon size={16} className='text-gray-500' />
							</div>
						)}
						<span className='font-medium text-gray-900'>{user.username}</span>
					</div>
				</td>

				<td className='px-6 py-4'>
					<RoleBadge role={user.role} />
				</td>

				<td className='px-6 py-4 text-sm text-gray-600'>
					<div className='flex items-center gap-1.5'>
						<Mail size={14} className='text-gray-400' />
						{user.email}
					</div>
				</td>

				<td className='px-6 py-4 text-sm text-gray-500'>
					{new Intl.DateTimeFormat('ru-RU', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					}).format(new Date(user.createdAt))}
				</td>

				<td className='px-6 py-4 text-right'>
					<div className='flex justify-end gap-2'>
						<button
							disabled={isPending}
							onClick={() => setShowConfirm(true)}
							className='text-gray-400 hover:text-red-600 disabled:opacity-50'
						>
							{isPending ? (
								<Loader2 size={18} className='animate-spin' />
							) : (
								<Trash2 size={18} />
							)}
						</button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className='text-gray-400 hover:text-gray-900'>
									<MoreVertical size={18} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem
									onClick={() =>
										onChangeRole(user.role === 'ADMIN' ? 'MEMBER' : 'ADMIN')
									}
								>
									Сделать {user.role === 'ADMIN' ? 'Пользователем' : 'Админом'}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</td>
			</tr>

			{/* <ConfirmModal
				open={showConfirm}
				onClose={() => setShowConfirm(false)}
				onConfirm={onDelete}
				title='Удалить пользователя?'
				description='Это действие нельзя отменить. Аккаунт будет полностью удален.'
				confirmText='Удалить'
				variant='danger'
			/> */}
		</>
	)
}
