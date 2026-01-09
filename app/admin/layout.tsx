import {
	ADMIN_MENU,
	AdminMenuItem,
} from '@/features/app-shell/config/admin-menu.config'
import Link from 'next/link'
import { Metadata } from 'next'
import { getSession } from '@/domain/auth/get-session'
import { AccountService } from '@/services/account.service'

export const metadata: Metadata = {
	title: {
		template: '%s | Панель управления', 
		default: 'Админ-панель',
	},
}

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getSession()

	const admin = await AccountService.getCurrentAdmin(session?.user?.id)

	return (
		<div className='flex min-h-screen bg-gray-100'>
			{/* Sidebar */}
			<aside className='w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col'>
				<div className='p-6 text-2xl font-bold border-b border-slate-800'>
					STORE <span className='text-blue-400'>ADMIN</span>
				</div>

				<nav className='flex-1 p-4 space-y-2'>
					{ADMIN_MENU.map((item: AdminMenuItem) => (
						<Link
							key={item.href}
							href={item.href}
							className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white'
						>
							<item.icon size={20} />
							<span>{item.label}</span>
						</Link>
					))}
				</nav>

				<div className='p-4 border-t border-slate-800'>
					<Link
						href='/'
						className='text-sm text-slate-400 hover:text-white transition-colors'
					>
						← Вернуться на сайт
					</Link>
				</div>
			</aside>

			{/* Main Content Area */}
			<main className='flex-1 flex flex-col min-w-0'>
				<header className='h-16 bg-white border-b flex items-center justify-between px-8'>
					<div className='text-sm text-gray-500'>
						Панель управления / Система
					</div>
					<div className='flex items-center gap-4'>
						<div className='text-right'>
							<p className='text-sm font-medium leading-none'>
								{admin?.username || 'Admin'}
							</p>
							<p className='text-xs text-gray-500 mt-1'>Role: {admin?.role}</p>
						</div>
						<div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold'>
							{admin?.username?.[0] || 'A'}
						</div>
					</div>
				</header>
				<div className='p-8 overflow-y-auto'>{children}</div>
			</main>
		</div>
	)
}
