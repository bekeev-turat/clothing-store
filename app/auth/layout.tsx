import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '@/domain/auth/auth.config'
import { Metadata } from 'next'
import Link from 'next/link'
import { ROUTE_MAP } from '@/shared/config/routes'

export const metadata: Metadata = {
	title: 'Аутентификация | Магазин BeUp',
}

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authConfig)

	if (session) {
		redirect('/')
	}

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4'>
			<div className='w-full max-w-md'>
				<Link href={ROUTE_MAP.home} className='block mb-10 text-center'>
					<h1 className='font-black text-3xl text-primary hover:scale-105 transition-transform'>
						BeUp
					</h1>
				</Link>

				<div className='bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100'>
					{children}
				</div>
			</div>
		</div>
	)
}
