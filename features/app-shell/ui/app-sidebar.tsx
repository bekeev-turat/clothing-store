'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { closeMenu } from '@/features/cart/store/ui/ui.slice'
import { ROUTE_MAP } from '@/shared/config/routes'
import { ADMIN_MENU } from '../config/admin-menu.config'
import { cn } from '@/shared/lib' 

import {
	IoLogInOutline,
	IoLogOutOutline,
	IoPersonOutline,
	IoTicketOutline,
	IoCloseOutline,
} from 'react-icons/io5'

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
			<div
				className={cn(
					'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300',
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
				)}
				onClick={close}
			/>

			{/* Sidebar */}
			<aside
				className={cn(
					'fixed top-0 left-0 z-50 h-screen w-full max-w-[320px] shadow-2xl transition-transform duration-300 ease-in-out',
					'bg-sidebar text-sidebar-foreground border-r border-sidebar-border',
					isOpen ? 'translate-x-0' : '-translate-x-full',
				)}
			>
				<div className='flex h-full flex-col'>
					{/* Header */}
					<div className='flex items-center justify-between px-6 py-5 border-b border-sidebar-border'>
						<h2 className='text-lg font-bold tracking-tight'>Меню</h2>
						<button
							onClick={close}
							className='p-1 rounded-md hover:bg-sidebar-accent transition-colors'
						>
							<IoCloseOutline size={24} />
						</button>
					</div>

					{/* Content */}
					<nav className='flex-1 overflow-y-auto px-4 py-6 space-y-1.5'>
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
								className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-destructive hover:bg-destructive/10'
							>
								<IoLogOutOutline size={20} />
								<span>Выйти</span>
							</button>
						)}

						{isAdmin && (
							<div className='pt-4'>
								<div className='mb-2 px-3'>
									<p className='text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70'>
										Администрирование
									</p>
								</div>
								<div className='space-y-1'>
									{ADMIN_MENU.map((el, i) => (
										<NavItem
											key={i}
											href={el.href}
											icon={<el.icon size={18} />}
											label={el.label}
											onClick={close}
										/>
									))}
								</div>
							</div>
						)}
					</nav>

					{/* Footer */}
					<div className='mt-auto border-t border-sidebar-border px-6 py-5'>
						<p className='text-xs text-muted-foreground font-medium'>
							© {new Date().getFullYear()} BeUp
						</p>
					</div>
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
		className={cn(
			'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
			'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
			'active:scale-[0.98]',
		)}
	>
		<span className='text-xl opacity-80'>{icon}</span>
		<span>{label}</span>
	</Link>
)
