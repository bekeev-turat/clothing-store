'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'

import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { closeMenu } from '@/features/cart/store/ui/ui.slice'
import { ROUTE_MAP } from '@/shared/config/routes'

import {
	IoLogInOutline,
	IoLogOutOutline,
	IoPersonOutline,
	IoTicketOutline,
} from 'react-icons/io5'
import { ADMIN_MENU } from '../config/admin-menu.config'

export const AppSidebar = () => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.ui.sideMenuOpened)

	const { data: session } = useSession()
	const isAuth = Boolean(session?.user)
	const isAdmin = session?.user?.role && session.user.role !== 'MEMBER'

	const close = () => dispatch(closeMenu())

	const logout = async () => {
		await signOut()
		close()
	}

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div className='fixed inset-0 z-30 bg-black/40' onClick={close} />
			)}

			{/* Sidebar */}
			<aside
				className={clsx(
					'fixed top-0 left-0 z-40 h-screen w-[360px] bg-white',
					'flex flex-col transition-transform duration-300',
					{
						'-translate-x-full': !isOpen,
						'translate-x-0': isOpen,
					},
				)}
			>
				{/* Header */}
				<div className='px-5 py-4 border-b'>
					<h2 className='text-2xl font-semibold'>Меню</h2>
				</div>

				{/* Content */}
				<nav className='flex-1 px-4 py-6 space-y-2'>
					{isAuth && (
						<>
							<NavItem
								href={ROUTE_MAP.profile}
								icon={<IoPersonOutline />}
								label='Мой профиль'
								onClick={close}
							/>

							<NavItem
								href={ROUTE_MAP.orders.root}
								icon={<IoTicketOutline />}
								label='Мои заказы'
								onClick={close}
							/>
						</>
					)}

					{!isAuth ? (
						<NavItem
							href={ROUTE_MAP.auth.login}
							icon={<IoLogInOutline />}
							label='Авторизация'
							onClick={close}
						/>
					) : (
						<button
							onClick={logout}
							className='flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-50'
						>
							<IoLogOutOutline />
							<span>Выйти</span>
						</button>
					)}

					{isAdmin && (
						<>
							<div className='my-4 h-px bg-gray-200' />

							<p className='px-3 text-xs font-medium uppercase text-gray-400'>
								Администрирование
							</p>
							{ADMIN_MENU.map((el, i) => (
								<NavItem
									key={i}
									href={el.href}
									icon={<el.icon size={16} />}
									label={el.label}
									onClick={close}
								/>
							))}
						</>
					)}
				</nav>

				{/* Footer */}
				<div className='border-t px-5 py-3 text-xs text-gray-400'>
					© {new Date().getFullYear()} BeUp
				</div>
			</aside>
		</>
	)
}

/* ---------------------------------- */

interface NavItemProps {
	href: string
	label: string
	icon: React.ReactNode
	onClick?: () => void
}

const NavItem = ({ href, label, icon, onClick }: NavItemProps) => (
	<Link
		href={href}
		onClick={onClick}
		className='flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100'
	>
		<span className='text-lg'>{icon}</span>
		<span>{label}</span>
	</Link>
)
