'use client'

import { useState, useTransition, useMemo } from 'react'
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
import { changeUserRoleAction } from '@/actions/admin/update-role.action'
import { deleteUserAction } from '@/actions/admin/delete-user.action'

interface UserRowProps {
	user: Account
}

export const UserRow = ({ user }: UserRowProps) => {
	const [isPending, startTransition] = useTransition()
	const [showConfirm, setShowConfirm] = useState(false)

	// Форматирование даты (useMemo предотвращает лишние вычисления)
	const formattedDate = useMemo(() => {
		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}).format(new Date(user.createdAt))
	}, [user.createdAt])

	const onDelete = () => {
		setShowConfirm(false) // Закрываем модалку сразу
		startTransition(async () => {
			try {
				const res = await deleteUserAction(user.id)
				if (res?.success) {
					toast.success('Пользователь удален')
				} else {
					toast.error(res?.error || 'Ошибка удаления')
				}
			} catch (error) {
				toast.error('Произошла непредвиденная ошибка')
			}
		})
	}

	const onChangeRole = (role: UserRole) => {
		startTransition(async () => {
			try {
				const res = await changeUserRoleAction({ userId: user.id, role })
				if (res?.success) {
					toast.success('Роль обновлена')
				} else {
					toast.error(res?.error || 'Ошибка обновления')
				}
			} catch (e) {
				toast.error('Ошибка соединения с сервером')
			}
		})
	}

	return (
		<>
			<tr className='hover:bg-gray-50 transition border-b'>
				<td className='px-6 py-4'>
					<div className='flex items-center gap-3'>
						<div className='relative w-8 h-8 flex-shrink-0'>
							{user.avatar ? (
								<Image
									fill
									src={user.avatar}
									alt={user.username}
									className='rounded-full object-cover'
								/>
							) : (
								<div className='w-full h-full rounded-full bg-gray-200 flex items-center justify-center'>
									<UserIcon size={16} className='text-gray-500' />
								</div>
							)}
						</div>
						<span className='font-medium text-gray-900 truncate max-w-[150px]'>
							{user.username}
						</span>
					</div>
				</td>

				<td className='px-6 py-4'>
					<RoleBadge role={user.role} />
				</td>

				<td className='px-6 py-4 text-sm text-gray-600'>
					<div className='flex items-center gap-1.5'>
						<Mail size={14} className='text-gray-400' />
						<span className='truncate max-w-[200px]'>{user.email}</span>
					</div>
				</td>

				<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
					{formattedDate}
				</td>

				<td className='px-6 py-4 text-right'>
					<div className='flex justify-end gap-2'>
						<button
							disabled={isPending}
							onClick={() => setShowConfirm(true)}
							className='text-gray-400 hover:text-red-600 disabled:opacity-30 transition-colors'
							title='Удалить'
						>
							{isPending ? (
								<Loader2 size={18} className='animate-spin' />
							) : (
								<Trash2 size={18} />
							)}
						</button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild disabled={isPending}>
								<button className='text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-colors'>
									<MoreVertical size={18} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem
									disabled={isPending}
									onClick={() =>
										onChangeRole(user.role === 'ADMIN' ? 'MEMBER' : 'ADMIN')
									}
								>
									Сделать {user.role === 'ADMIN' ? 'пользователем' : 'админом'}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</td>
			</tr>

			<ConfirmModal
				open={showConfirm}
				onClose={() => setShowConfirm(false)}
				onConfirm={onDelete}
				title='Удалить пользователя?'
				description={`Вы уверены, что хотите удалить ${user.username}? Это действие нельзя отменить.`}
				confirmText='Удалить'
				variant='danger'
			/>
		</>
	)
}
